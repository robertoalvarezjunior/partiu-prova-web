import { Routes } from '@angular/router';
import { Home } from './screens/home/home';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./screens/login/login').then((m) => m.Login),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./screens/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: '',
    component: Home,
  },
  {
    path: 'success',
    loadComponent: () =>
      import('./components/success-component/success-component').then((m) => m.SuccessComponent),
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./features/auth/callback/callback').then((m) => m.Callback),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
