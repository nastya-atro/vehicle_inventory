import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CAR_ROUTES } from './vehicles.routes';
import { VehiclesComponent } from './vehicles.component';
import { TableModule } from '../../shared/modules/table/table.module';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    RouterModule.forChild(CAR_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    TableModule,
    PaginationModule,
  ],
  declarations: [VehiclesComponent, MapComponent],
})
export class VehiclesModule {}
