import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { STREAM_ROUTES } from './vehicle.routes';
import { AddNewVehicleComponent } from './add-new-vehicle/addNewVehicle.component';
import { SharedModule } from '../../shared/shared.module';
import { DpDatePickerModule } from 'ng2-date-picker';
import { EditVehicleComponent } from './edit-vehicle/editVehicle.component';
import { ImageUploadModule } from '../../shared/directives/image-upload/imageUpload.module';

@NgModule({
  imports: [
    RouterModule.forChild(STREAM_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    DpDatePickerModule,
    ImageUploadModule,
  ],
  declarations: [AddNewVehicleComponent, EditVehicleComponent],
})
export class VehicleModule {}
