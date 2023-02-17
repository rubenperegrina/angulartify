import { enableProdMode, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SpotifyService } from './services/spotify.service';

export const authGuard = () => {
  const spotifyService = inject(SpotifyService);
  const token = spotifyService.getAccessToken();
  if (!token)
    spotifyService.logOut();

  return new Promise(async (res) => {
    const userCreated = await spotifyService.initUser();
    if (userCreated)
      res(true);
    else
      res(spotifyService.logOut());
  })
}

export const routes: Routes =
  [
    {
      path: 'login',
      loadComponent: () => import('./pages/login/login.component')
        .then(m => m.LoginComponent)
    },
    {
      path: 'home',
      loadComponent: () => import('./pages/home/home.component')
        .then(m => m.HomeComponent),
      canActivate: [authGuard]
    },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
  ];

if (environment.production) {
  enableProdMode();
}
