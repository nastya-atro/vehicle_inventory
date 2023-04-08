import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { UserSignInFormGroup } from '../../../core/interfaces/forms/auth-forms.interface';
import Utils from '../../../core/utils/utils';

@UntilDestroy()
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent {
  form: UserSignInFormGroup;

  constructor(private service: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        Validators.pattern('(?=^.{6,}$)(?=.*[A-Z])(?=.*[a-z]).*'),
      ]),
    }) as UserSignInFormGroup;
  }

  submit(): void {
    if (this.form.valid) {
      this.service
        .login(this.form.value.username, this.form.value.password)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => this.afterLogin(),
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.form);
    }
  }

  afterLogin(): void {
    this.service
      .findCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => this.router.navigate(['/vehicles']),
        error: () => this.service.logout(),
      });
  }
}
