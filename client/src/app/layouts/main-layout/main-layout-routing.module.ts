import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () =>
          import('../../features/vehicle/vehicle.module').then(m => {
            return m.VehicleModule;
          }),
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () =>
          import('../../features/profile/profile.module').then(m => {
            return m.ProfileModule;
          }),
      },

      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () =>
          import('../../features/vehicles-list/vehicles.module').then(m => {
            return m.VehiclesModule;
          }),
      },
    ],
  },
];
