import { Pipe, PipeTransform } from '@angular/core';

type ValidationFormControl = {
  minLength?: { actualLength: number; requiredLength: number };
  maxLength?: { actualLength: number; requiredLength: number };
  pattern?: { actualValue: string; requiredPattern: string };
  required?: boolean;
  mustMatch?: boolean;
};

enum PatternMessage {
  password = 'Password must contain one uppercase, one lowercase, one number',
  email = 'Wrong Email format',
  default = 'Pattern Error',
}

@Pipe({
  name: 'validateError',
  pure: false,
})
export class ValidateErrorPipe implements PipeTransform {
  transform(errors: ValidationFormControl | null | undefined | any, patternEntity: string = 'default'): string {
    if (errors && errors !== undefined) {
      const lastError = Object.keys(errors)[Object.keys(errors).length - 1];
      switch (lastError) {
        case 'required': {
          return 'Required field';
        }
        case 'pattern': {
          return (PatternMessage as any)[patternEntity];
        }
        case 'maxlength': {
          return `Field maximum length is ${errors[lastError].requiredLength} chars`;
        }
        case 'minlength': {
          return `Field minimum length is ${errors[lastError].requiredLength} chars`;
        }
        case 'mustMatch': {
          return 'Passwords must be match';
        }
      }
      return '';
    }
    return '';
  }
}
