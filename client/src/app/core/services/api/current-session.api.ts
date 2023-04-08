import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CurrentUserResponse } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentSessionApi implements OnDestroy {
  constructor(private api: ApiService) {}

  findCurrentUser(): Observable<CurrentUserResponse> {
    return this.api.get(`/auth/profile`);
  }

  ngOnDestroy(): void {}
}
