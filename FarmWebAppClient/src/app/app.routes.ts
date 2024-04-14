import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'animals',
    loadChildren: () =>
      import('./animals/animals-routes').then((x) => x.routes),
  },
  {
    path: '**',
    redirectTo: '/animals',
  },
];
