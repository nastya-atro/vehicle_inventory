import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ProfileService } from '../../features/profile/profile.service';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<any> {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.profileService.getProfileInfo().pipe(
      catchError((error: Error) => {
        if (error.message === 'Object not found') this.router.navigate(['/404']);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
