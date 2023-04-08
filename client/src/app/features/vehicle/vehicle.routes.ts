import { Routes } from '@angular/router';
import { AddNewVehicleComponent } from './add-new-vehicle/addNewVehicle.component';
import { EditVehicleComponent } from './edit-vehicle/editVehicle.component';
import { VehicleDetailResolver } from '../../core/resolvers/vehicle-detail.resolver';

export const STREAM_ROUTES: Routes = [
  {
    path: 'new-vehicle',
    component: AddNewVehicleComponent,
  },
  {
    path: 'edit/:id',
    resolve: { vehicleComponentData: VehicleDetailResolver },
    component: EditVehicleComponent,
  },
];
