import { Component, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../../core/validators/must-match.validator';
import { UserSignUpFormGroup } from '../../../core/interfaces/forms/auth-forms.interface';
import Utils from '../../../core/utils/utils';
@UntilDestroy()
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  form: UserSignUpFormGroup;

  constructor(private service: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'
            ),
            Validators.maxLength(80),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*'),
            Validators.minLength(6),
            Validators.maxLength(255),
          ],
        ],
        confirmPassword: ['', [Validators.required, Validators.maxLength(255)]],
        isAgreement: [true],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    ) as UserSignUpFormGroup;
  }

  submit(): void {
    if (this.form.valid) {
      if (!this.form.value.isAgreement) {
        return;
      }
      this.service
        .signup({ ...this.form.value })
        .pipe(untilDestroyed(this))
        .subscribe({
          next: token => {
            this.router.navigateByUrl(`/pre-activate?token=${token}`, {
              state: { email: this.form.controls.email.value },
            });
          },
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.form);
    }
  }

  ngOnDestroy(): void {
    this.form.reset();
  }
}
