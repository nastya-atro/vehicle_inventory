import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthAccessGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthorized().pipe(
      map(isAuthorized => {
        if (isAuthorized) {
          this.router.navigate(['/vehicles']);
        }
        return !isAuthorized;
      })
    );
  }
}
