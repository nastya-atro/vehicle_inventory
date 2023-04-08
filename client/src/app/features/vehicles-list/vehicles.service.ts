import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Vehicles } from '../../core/services/api/vehicles';
import { ResponseListInterface } from '../../core/interfaces/payload-list.interface';
import { QueryParams } from '../../core/interfaces/query-params.interfaces';
import { CarsListResponse } from '../../core/models/vehicle.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class VehiclesService implements OnDestroy {
  constructor(private router: Router, private carsApi: Vehicles) {}

  ngOnDestroy(): void {}

  getCars(params: QueryParams): Observable<ResponseListInterface<CarsListResponse>> {
    return this.carsApi.getCars(params);
  }

  removeCar(id: number): Observable<unknown> {
    return this.carsApi.removeCar(id);
  }
}
