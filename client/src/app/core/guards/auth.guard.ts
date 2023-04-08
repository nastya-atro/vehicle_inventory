import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthorized().pipe(
      map(isAuthorized => {
        if (!isAuthorized) {
          this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        }
        return isAuthorized;
      })
    );
  }
}
