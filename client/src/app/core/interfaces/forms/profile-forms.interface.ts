import { AbstractControl, FormGroup } from '@angular/forms';

interface IUserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserProfileFormGroup extends FormGroup {
  value: IUserProfile;

  controls: {
    firstName: AbstractControl;
    lastName: AbstractControl;
    email: AbstractControl;
  };
}
