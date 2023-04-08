import { Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const CAR_ROUTES: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'vehicles',
    component: VehiclesComponent,
  },
];
