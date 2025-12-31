import { Routes } from '@angular/router';
import { Home } from './screens/home/home';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then((m) => m.Register),
  },
  {
    path: '',
    component: Home,
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
