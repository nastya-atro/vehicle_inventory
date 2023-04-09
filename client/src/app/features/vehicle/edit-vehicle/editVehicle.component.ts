import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import Utils from '../../../core/utils/utils';
import { NotifyService } from '../../../shared/modules/notifications/notify.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { VehicleService } from '../vehicle.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { CroppedState } from '../../../shared/directives/image-upload/image-upload.component';
import { Car, CarResolverData } from '../../../core/models/vehicle.model';
import { EditCarFormGroup } from '../../../core/interfaces/forms/vehicle-forms.interface';
import { CAR_TYPES_FILTER } from '../../../core/constants/vehicle.constants';

@UntilDestroy()
@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './editVehicle.component.html',
  styleUrls: ['./editVehicle.component.scss', '../datePicker.styles.scss'],
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
export class EditVehicleComponent implements OnInit {
  id!: number;
  car!: Car;
  form: EditCarFormGroup;
  loading = false;
  carTypes = [...CAR_TYPES_FILTER];

  readonly dateForat: string = 'YYYY-MM-DD HH:mm:ss';
  dayPickerconfig: IDatePickerDirectiveConfig = {
    enableMonthSelector: false,
    showNearMonthDays: false,
    format: this.dateForat,
    weekDayFormat: 'dd',
    showGoToCurrent: false,
    monthFormat: 'MMMM YYYY',
    disableKeypress: true,
  };

  displayImageError: ValidatorFn = (): ValidationErrors | null => {
    if (this.form?.controls.imageFile.value || this.form?.controls.originImage.value) {
      return null;
    } else {
      return { rangeError: true };
    }
  };

  constructor(
    private router: Router,
    private clipboard: Clipboard,
    private carService: VehicleService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotifyService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      type: new FormControl(null, [Validators.required]),
      latitude: new FormControl<number | null>(null, [Validators.required]),
      longitude: new FormControl<number | null>(null, [Validators.required]),
      lastConnection: new FormControl(''),

      image: new FormControl(''),
      imageCropSettings: new FormControl(''),
      originImage: new FormControl('', this.displayImageError),
      imageFile: new FormControl(null),
      croppedImageFile: new FormControl(null),
    }) as EditCarFormGroup;
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe({
      next: data => {
        const carData = (data as CarResolverData)?.vehicleComponentData || null;
        if (carData) {
          this.car = {
            ...carData,
          };
          this.id = carData.id;
          this.form.patchValue({
            name: this.car.name,
            type: this.car.typeId,
            latitude: this.car.latitude,
            longitude: this.car.longitude,
            lastConnection: this.car.lastConnection
              ? Utils.utcDateStringToLocalString(this.car.lastConnection, this.dateForat)
              : null,
            image: this.car.image,
            imageCropSettings: this.car.imageCropSettings,
            originImage: this.car.originImage,
          });
        }
      },
      error: () => {},
    });
  }

  loadCar() {
    this.carService
      .getCar(this.id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe(result => {
        this.form.patchValue({
          name: result.name,
          type: result.typeId,
          latitude: result.latitude,
          longitude: result.longitude,
          lastConnection: result.lastConnection
            ? Utils.utcDateStringToLocalString(result.lastConnection, this.dateForat)
            : null,
          image: result.image,
          imageCropSettings: result.imageCropSettings,
          originImage: result.originImage,
        });
        this.car = {
          ...result,
        };
      });
  }

  editCar() {
    if (this.id) {
      if (this.form.valid) {
        const data = {
          name: this.form.controls.name.value,
          type: this.form.controls.type.value,
          latitude: this.form.controls.latitude.value,
          longitude: this.form.controls.longitude.value,
          lastConnection: this.form.controls.lastConnection.value
            ? Utils.utcDateStringToLocalString(this.form.controls.lastConnection.value, this.dateForat)
            : null,

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

        this.carService
          .editCar(this.id, formData)
          .pipe(
            untilDestroyed(this),
            finalize(() => (this.loading = false))
          )
          .subscribe({
            next: () => {
              this.loadCar();
              this.notifyService.notifier.success('Vehicle edited success');
            },
            error: () => {},
          });
      } else {
        Utils.checkFormValidation(this.form);
      }
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
      banner: '',
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

  dateIntervalChange() {
    this.form.controls.lastConnection.updateValueAndValidity();
  }
}
