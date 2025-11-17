import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./screens/register-event/register-event').then(m => m.RegisterEvent)
    }
];
