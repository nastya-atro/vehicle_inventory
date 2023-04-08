import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { CurrentSessionApi } from '../../core/services/api/current-session.api';
import { catchError, map } from 'rxjs/operators';
import { AuthApi } from '../../core/services/api/auth.api';
import { CreateUserRequest, CurrentUserResponse } from '../../core/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as appActions from '../../store/app.actions';
import { selectUser } from '../../store/app.selectors';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {
  constructor(
    private router: Router,
    private authApi: AuthApi,
    private usersApi: CurrentSessionApi,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {}

  activateProfile(token: string) {
    return this.authApi.activate(token);
  }

  developActivateProfile(token: string) {
    return this.authApi.developActivate(token);
  }

  sendConfirmEmailToken(token: string) {
    return this.authApi.sendConfirmEmailToken(token);
  }

  login(username: string, password: string): Observable<unknown> {
    return this.authApi.login(username, password);
  }

  signup(user: CreateUserRequest): Observable<unknown> {
    return this.authApi.signup(user);
  }

  getUserInfo(token: string): Observable<{ email: string; phone: string }> {
    return this.authApi.getUserInfo(token);
  }

  logout() {
    return this.authApi
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.store.dispatch(appActions.clearStoreData());
          this.router.navigate(['/signin']);
        },
        error: () => {
          this.store.dispatch(appActions.clearStoreData());
          this.router.navigate(['/signin']);
        },
      });
  }

  findCurrentUser(): Observable<void | CurrentUserResponse | null> {
    return this.usersApi.findCurrentUser().pipe(
      map(user => {
        this.store.dispatch(appActions.findUserProfileSuccess({ user }));
        return user;
      }),
      catchError(error => {
        return of(console.log(error));
      })
    );
  }

  isAuthorized(): Observable<boolean> {
    return this.store.select(selectUser).pipe(map(user => !!user?.id));
  }

  initializer() {
    return this.findCurrentUser();
  }
}
