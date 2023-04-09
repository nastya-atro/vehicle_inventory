import { FormArray, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export default class Utils {
  constructor() {}

  static checkFormValidation(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control && control.markAsTouched({ onlySelf: true });
      if (control instanceof FormArray) {
        control.controls.forEach(c => Utils.checkFormValidation(c as FormGroup));
      }
    });
  }

  static localDateToUtcString(date: string, format?: string | undefined): string {
    return moment(new Date(date)).utc().format(format);
  }

  static utcDateStringToLocalString(date: string, format?: string | undefined): string {
    return moment(new Date(date)).format(format);
  }

  static fromObjToFormData(data: { [key: string]: any }) {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
  }

  static hexToRGBA = (hex: string, opacity: number = 1): string => {
    opacity = opacity < 1 && opacity >= 0 ? opacity : 1;
    hex = hex.replace('#', '');

    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity})`;
  };
}
