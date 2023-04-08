import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { VehicleService } from '../../features/vehicle/vehicle.service';

@Injectable({ providedIn: 'root' })
export class VehicleDetailResolver implements Resolve<any> {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private vehicleService: VehicleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.paramMap.get('id') || '';

    return this.vehicleService.getCar(Number(id)).pipe(
      catchError((error: Error) => {
        if (error.message === 'Object not found') this.router.navigate(['/404']);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
