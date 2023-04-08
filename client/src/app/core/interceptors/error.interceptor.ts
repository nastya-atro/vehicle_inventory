import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as appActions from '../../store/app.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private notifyService: NotifyService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errors: string[] = [];
        switch (err.status) {
          case HttpStatusCode.Unauthorized:
            this.store.dispatch(appActions.clearStoreData());
            this.router.navigate(['/signin']);
            errors.push(err.error.message || 'Unauthorized');
            break;
          case HttpStatusCode.BadRequest:
            errors = errors.concat(err.error.message);
            break;
          case HttpStatusCode.Forbidden:
            errors.push(err.error.message || 'Forbidden error');
            break;
          case HttpStatusCode.InternalServerError:
            errors.push(err.error.message || 'Internal Server Error');
            break;
          case HttpStatusCode.NotFound:
            break;
          default:
            errors.push(err.error.message || 'Something went wrong');
        }
        errors.slice(0, 3).forEach((error, i) => {
          setTimeout(() => {
            this.notifyService.notifier.warning(error);
          }, i * 500);
        });
        return throwError(() => err);
      })
    );
  }
}
