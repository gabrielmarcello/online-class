import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/multiplication',
    pathMatch: 'full'
  },
  {
    path: 'multiplication',
    loadComponent: () => import('./multiplication/multiplication.component').then(m => m.MultiplicationComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  }
];
