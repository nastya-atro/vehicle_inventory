import { AbstractControl, FormGroup } from '@angular/forms';

interface IUserSignIn {
  username: string;
  password: string;
}

export interface UserSignInFormGroup extends FormGroup {
  value: IUserSignIn;

  controls: {
    username: AbstractControl;
    password: AbstractControl;
  };
}

interface IUserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAgreement: boolean;
}

export interface UserSignUpFormGroup extends FormGroup {
  value: IUserSignUp;

  controls: {
    firstName: AbstractControl;
    lastName: AbstractControl;
    email: AbstractControl;
    password: AbstractControl;
    confirmPassword: AbstractControl;
    isAgreement: AbstractControl;
  };
}

interface IUserRecoveryPassword {
  password: string;
  confirmPassword: string;
}

export interface UserRecoveryPasswordFormGroup extends FormGroup {
  value: IUserRecoveryPassword;

  controls: {
    password: AbstractControl;
    confirmPassword: AbstractControl;
  };
}
