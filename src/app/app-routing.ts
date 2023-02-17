import { enableProdMode, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SpotifyService } from './services/spotify.service';

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
        canActivate: [() => inject(SpotifyService).isLoggedIn()]
    },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
  ];

if (environment.production) {
  enableProdMode();
}
