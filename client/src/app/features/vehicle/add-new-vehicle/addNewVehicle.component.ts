import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { NotifyService } from '../../../shared/modules/notifications/notify.service';
import Utils from '../../../core/utils/utils';
import { Router } from '@angular/router';
import { NewCarFormGroup } from '../../../core/interfaces/forms/vehicle-forms.interface';
import { CroppedState } from '../../../shared/directives/image-upload/image-upload.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { CAR_TYPES_FILTER } from '../../../core/constants/vehicle.constants';

@UntilDestroy()
@Component({
  selector: 'app-new-vehicle',
  templateUrl: './addNewVehicle.component.html',
  styleUrls: ['./addNewVehicle.component.scss', '../datePicker.styles.scss'],
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
export class AddNewVehicleComponent {
  form: NewCarFormGroup;
  carTypes = [...CAR_TYPES_FILTER];

  defaultGarageLocation = {
    latitude: 51.107883,
    longitude: 17.038538,
  };

  displayImageError: ValidatorFn = (): ValidationErrors | null => {
    if (this.form?.controls.imageFile.value || this.form?.controls.originImage.value) {
      return null;
    } else {
      return { rangeError: true };
    }
  };

  constructor(private carsService: VehicleService, private notifyService: NotifyService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      type: new FormControl(null, [Validators.required]),
      latitude: new FormControl<number | null>(null, [Validators.required]),
      longitude: new FormControl<number | null>(null, [Validators.required]),
      isDefaultLocation: new FormControl(false),

      image: new FormControl(''),
      imageCropSettings: new FormControl(''),
      originImage: new FormControl('', this.displayImageError),
      imageFile: new FormControl(null),
      croppedImageFile: new FormControl(null),
    }) as NewCarFormGroup;
  }

  createCar() {
    if (this.form.valid) {
      const data = {
        name: this.form.controls.name.value,
        type: this.form.controls.type.value,
        latitude: this.form.controls.latitude.value,
        longitude: this.form.controls.longitude.value,

        image: this.form.controls.image.value,
        imageCropSettings: this.form.controls.imageCropSettings.value,
        originImage: this.form.controls.originImage.value,
        imageFile: this.form.controls.imageFile.value,
      };
      const formData = new FormData();
      this.form.get('imageFile')?.value && formData.append('imageFile', this.form.get('imageFile')?.value);
      this.form.get('croppedImageFile')?.value &&
        formData.append('croppedImageFile', this.form.get('croppedImageFile')?.value);
      formData.append('vehicle', JSON.stringify({ ...data }));

      this.carsService
        .createCar(formData)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.router.navigate([`/edit/${res.vehicleId}`]);
            this.notifyService.notifier.success('Vehicle created success');
          },
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.form);
    }
  }

  onUploadImageFinished({ file }: { file: File; type: string }) {
    this.form.patchValue({
      originImage: '',
      imageFile: file,
    });
  }

  setCroppedImageState({ file, position }: CroppedState) {
    this.form.patchValue({
      imageCropSettings: position,
      croppedImageFile: file,
      image: '',
    });
  }

  resetImage() {
    this.form.patchValue({
      croppedImageFile: null,
      imageFile: null,
      originImage: null,
      imageCropSettings: null,
      image: null,
    });
  }

  setDefaultValue() {
    if (this.form.controls.isDefaultLocation.value) {
      this.form.patchValue({
        latitude: this.defaultGarageLocation.latitude,
        longitude: this.defaultGarageLocation.longitude,
      });
    } else {
      this.form.patchValue({
        latitude: null,
        longitude: null,
      });
    }
  }

  resetCheckbox() {
    this.form.patchValue({
      isDefaultLocation: false,
    });
  }
}
