import { Routes } from '@angular/router';
import { playerComponent } from './player.component';

export const playerRoutes: Routes =
  [
    {
      path: '',
      component: playerComponent,
      children: [
        {
          path: 'home',
          loadComponent: () => import('../home/home.component')
            .then(m => m.HomeComponent)
        },
      ]
    },
  ];