import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { AuthAccessGuard } from '../../core/guards/auth-access.guard';

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthAccessGuard],
    component: AuthLayoutComponent,
    loadChildren: () => import('../../features/authentication/authentication.module').then(m => m.AuthenticationModule),
  },
];
