import { enableProdMode, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from './services/authorization.service';
import { SpotifyService } from './services/spotify.service';

export const authGuard = () => {
  const spotifyService = inject(SpotifyService);
  const authorizationService = inject(AuthorizationService);
  const token = authorizationService.getAccessToken();
  if (!token)
  authorizationService.logOut();

  return new Promise(async (res) => {
    const userCreated = await spotifyService.initUser();
    if (userCreated)
      res(true);
    else
      res(authorizationService.logOut());
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
      path: 'player',
      loadChildren: () => import('./pages/player/player-routing')
        .then(m => m.playerRoutes),
      canActivate: [authGuard]
    },
    { path: '', pathMatch: 'full', redirectTo: 'player' },
    { path: '**', pathMatch: 'full', redirectTo: 'player' },
  ];

if (environment.production) {
  enableProdMode();
}
