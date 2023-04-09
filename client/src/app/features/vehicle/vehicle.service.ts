import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { VehiclesApi } from '../../core/services/api/vehicles';
import { CarResponse } from '../../core/models/vehicle.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class VehicleService implements OnDestroy {
  constructor(private router: Router, private carsApi: VehiclesApi) {}

  ngOnDestroy(): void {}

  createCar(formData: FormData): Observable<{ vehicleId: number }> {
    return this.carsApi.createCar(formData);
  }

  getCar(id: number): Observable<CarResponse> {
    return this.carsApi.getCar(id);
  }

  editCar(id: number, formData: FormData): Observable<unknown> {
    return this.carsApi.editCar(id, formData);
  }
}
