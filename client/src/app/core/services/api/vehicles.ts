import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { CarResponse, CarsListResponse } from '../../models/vehicle.model';
import { ResponseListInterface } from '../../interfaces/payload-list.interface';
import { QueryParams } from '../../interfaces/query-params.interfaces';

@Injectable({
  providedIn: 'root',
})
export class VehiclesApi implements OnDestroy {
  SEGMENT = '/vehicle';

  constructor(private api: ApiService) {}

  createCar(formData: FormData): Observable<{ vehicleId: number }> {
    return this.api.post(`${this.SEGMENT}`, formData);
  }

  getCars(params: QueryParams): Observable<ResponseListInterface<CarsListResponse>> {
    return this.api.get(`${this.SEGMENT}`, params);
  }

  getCar(id: number): Observable<CarResponse> {
    return this.api.get(`${this.SEGMENT}/${id}`);
  }

  removeCar(id: number): Observable<unknown> {
    return this.api.delete(`${this.SEGMENT}/${id}`);
  }

  editCar(id: number, formData: FormData): Observable<unknown> {
    return this.api.put(`${this.SEGMENT}/${id}`, formData);
  }

  ngOnDestroy(): void {}
}
