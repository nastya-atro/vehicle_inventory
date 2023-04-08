import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import Utils from '../../core/utils/utils';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import { ActivatedRoute } from '@angular/router';
import { Profile, ProfileResolverData } from '../../core/models/user.model';
import { UserProfileFormGroup } from '../../core/interfaces/forms/profile-forms.interface';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { finalize } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 0.4, delay: 0 },
        })
      ),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  form: UserProfileFormGroup;
  loading = false;

  constructor(
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private notifyService: NotifyService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'),
        Validators.maxLength(80),
      ]),
    }) as UserProfileFormGroup;
  }

  ngOnInit() {
    this.activateRoute.data.pipe(untilDestroyed(this)).subscribe({
      next: data => {
        const profileData = (data as ProfileResolverData)?.profileComponentData || null;
        if (profileData) {
          this.profile = profileData;
          this.form.patchValue({
            firstName: this.profile.firstName || '',
            lastName: this.profile.lastName || '',
            email: this.profile.email || '',
          });
        }
      },
    });
  }

  loadProfile() {
    this.profileService
      .getProfileInfo()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: result => {
          this.profile = result;
          this.form.patchValue({
            firstName: result.firstName || '',
            lastName: result.lastName || '',
            email: result.email || '',
          });
        },
        error: () => {},
      });
  }

  editProfile() {
    const data = { ...this.form.value }; // get form data
    this.loading = true;

    if (this.form.valid) {
      this.profileService
        .editProfile(data)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: () => {
            this.loadProfile();
            this.notifyService.notifier.success('Profile edited success');
          },
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.form);
    }
  }
}
