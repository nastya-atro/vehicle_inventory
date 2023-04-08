import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from '../../core/resolvers/profile.resolver';
import { AuthGuard } from '../../core/guards/auth.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],

    resolve: { profileComponentData: ProfileResolver },
    component: ProfileComponent,
  },
];
