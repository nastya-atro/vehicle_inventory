import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ProfileApi } from '../../core/services/api/profile.api';
import { EditProfileRequest, ProfileResponse } from '../../core/models/user.model';
import { Observable } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ProfileService implements OnDestroy {
  constructor(private router: Router, private profileApi: ProfileApi) {}

  ngOnDestroy(): void {}

  getProfileInfo(): Observable<ProfileResponse> {
    return this.profileApi.getProfileInfo();
  }

  editProfile(data: EditProfileRequest): Observable<unknown> {
    return this.profileApi.editProfile(data);
  }
}
