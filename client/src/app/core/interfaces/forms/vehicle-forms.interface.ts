import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export interface INewCar {
  name: string;
  type: number | null;
  image: string;
  imageCropSettings: string;
  originImage: string;
  longitude: number | null;
  latitude: number | null;
  imageFile: any;

  isDefaultLocation: boolean;
}

export interface NewCarFormGroup extends FormGroup {
  value: INewCar;

  controls: {
    name: AbstractControl;
    type: AbstractControl;
    longitude: AbstractControl;
    latitude: AbstractControl;
    isDefaultLocation: AbstractControl;

    image: AbstractControl;
    imageCropSettings: AbstractControl;
    originImage: AbstractControl;
    imageFile: AbstractControl;
  };
}

export interface IEditCar {
  name: string;
  type: number | null;
  longitude: number | null;
  latitude: number | null;
  image: string;
  imageCropSettings: string;
  originImage: string;
  imageFile: any;
  lastConnection: string;
}

export interface EditCarFormGroup extends FormGroup {
  value: IEditCar;

  controls: {
    name: AbstractControl;
    lastConnection: AbstractControl;
    type: AbstractControl;
    longitude: AbstractControl;
    latitude: AbstractControl;
    image: AbstractControl;
    imageCropSettings: AbstractControl;
    originImage: AbstractControl;
    imageFile: AbstractControl;
  };
}
