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
        {
          path: 'search',
          loadComponent: () => import('../search/search.component')
            .then(m => m.SearchComponent)
        },
        {
          path: 'library',
          loadComponent: () => import('../library/library.component')
            .then(m => m.LibraryComponent)
        },
        {
          path: 'list/:type/:id',
          loadComponent: () => import('../list/list.component')
            .then(m => m.ListComponent)
        },
      ]
    },
  ];