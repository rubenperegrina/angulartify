import { enableProdMode } from '@angular/core';
import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes =
  [
    {
      path: 'login',
      loadComponent: () => import('./pages/login/login.component')
        .then(m => m.LoginComponent)
    },
  ];

if (environment.production) {
  enableProdMode();
}
