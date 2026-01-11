import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./features/signup/sign.up').then((m) => m.SignUp),
  },
  {
    path: '',
    component: Home,
  },
  {
    path: 'success',
    loadComponent: () => import('./features/success/success').then((m) => m.Success),
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./features/auth/callback/callback').then((m) => m.Callback),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'events',
    loadComponent: () => import('./features/events/events').then((m) => m.Events),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
