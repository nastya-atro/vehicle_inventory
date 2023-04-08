import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/lib/interfaces';

export interface CropSettings {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface CroppedState {
  file: File | null;
  position: CropSettings | null;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Input() originUrl!: string;
  @Input() image!: string | null;
  @Input() type!: 'background';
  @Input() title!: string;
  @Input() descriptions!: string[];

  // Info for CropperModal
  @Input() isCroppingNeed!: boolean;
  @Input() croppedImage!: string | null;
  @Input() cropSettings!: CropSettings | null;
  @Input() aspectRatio!: number;
  //size of CropperModal
  @Input() slimSizeModal = false;

  // Info for display or lock uploading
  @Input() disabled!: boolean;
  @Input() markError!: boolean;

  @Output() uploadFinished = new EventEmitter();
  @Output() setCroppedBackgroundState = new EventEmitter();
  @Output() setPreviewImage = new EventEmitter();
  @Output() removed = new EventEmitter();

  cropLoading = true;

  state = {
    croppedEvent: {
      cropperPosition: {},
      base64: '' as string | null | undefined,
    }, // set after every changing cropper-position

    modalOriginImage: '', // converted origin image to base64 string to use it in cropper
    cropperPosition: { x1: 0, y1: 0, x2: 0, y2: 0 }, // default cropper Position
    cropperReady: false,
    hasCropper: false,

    imagePreview: '', // only for displaying origin unsaved image
    croppedImagePreview: '' as string | null | undefined, // only for displaying cropped unsaved image

    // prepared for uploading image data
    image: {
      position: { x1: 0, y1: 0, x2: 0, y2: 0 } as any,
      originFile: null as File | null,
      croppedFile: null as File | null,
    },
  };
  errorsList: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  /**
   * convert image to ToBase64 for displaying in Cropper-Modal
   * @param url
   * @param callback
   */
  convertToBase64(url: string, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  /**
   * convert Base64 to image for setCroppedImageState after apply cropper position
   * @param dataUrl
   * @param filename
   */
  convertToFile(dataUrl: any, filename = 'cropped_image.png') {
    let arr: any = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  /**
   * Set croppedEvent state after change cropper position
   * @param event
   */
  imageCropped(event: ImageCroppedEvent) {
    this.state.croppedEvent.cropperPosition = event.cropperPosition;
    this.state.croppedEvent.base64 = event.base64;
  }

  /**
   * SetCroppedImageState after apply cropper position
   */
  applyCroppingImage() {
    if (this.state.croppedEvent) {
      this.state.croppedImagePreview = this.state.croppedEvent.base64;

      this.state.image.position = this.calcPositionToStore(this.state.croppedEvent.cropperPosition);
      this.state.image.originFile && this.uploadFinished.emit({ file: this.state.image.originFile, type: this.type });

      this.state.image.croppedFile = this.convertToFile(this.state.croppedEvent.base64);
      this.setCroppedBackgroundState.emit({
        file: this.state.image.croppedFile,
        position: this.state.image.position,
      });

      this.closeModal(false);
    }
  }

  /**
   * Check cropper-image is load
   */
  imageLoaded() {
    this.state.cropperReady = true;
  }

  /**
   * Convert position-cropper state to percent
   */
  cropperComponentReady() {
    this.cropLoading = false;

    if (this.cropSettings) {
      let newCrop = this.calcPositionFromStore(this.cropSettings);
      this.state.cropperPosition = { ...newCrop };
    }
  }

  /**
   * Open modal-cropper after content upload or  after click to change cropperPosition button
   */
  showModalPreview(img: string | null) {
    if (img) {
      this.state.hasCropper = true;
      this.convertToBase64(img, (data: any) => {
        this.state.modalOriginImage = data;
      });
    }
  }

  /**
   * Upload content using drag-and-drop functional
   */
  onFileDropped(data: FileList) {
    let file = data[0];
    if (file) {
      this.readFileAndSetImage(file, data);
    }
  }

  /**
   * Handle error uploading
   */
  onFileDropFailed(event: any) {
    if (event.message) {
      this.addError(event.message);
    }
  }

  /**
   * Read file, validate size, set Image after drag-and-drop or FileBrowse
   */
  private readFileAndSetImage(file: File, fileList: FileList | []) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.state.imagePreview = event.target.result;
      if (this.isCroppingNeed) {
        this.state.hasCropper = true;
      }
    };
    reader.readAsDataURL(file);
    this.checkAndUpload(fileList);
  }

  /**
   * Start content upload after image choose
   */
  fileBrowseHandler(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | [] = element.files || [];
    let file = fileList[0];
    if (file) {
      this.readFileAndSetImage(file, fileList);
    }
  }

  /**
   * Check possible to upload
   */
  private checkAndUpload(data: any | FileList) {
    for (const item of data) {
      this.uploadFile(item);
    }
  }

  /**
   * Upload content with cropperState or without cropperState
   * @param file
   */
  uploadFile(file: File) {
    if (this.isCroppingNeed) {
      this.state.image.originFile = file;
      this.state.image.position = null;
      this.uploadFinished.emit({
        file: this.state.image.originFile,
        type: this.type,
      });
      this.setCroppedBackgroundState.emit({
        file: this.state.image.originFile,
        position: null,
      });
    } else {
      // this.state.image.originFile = file;
      // this.state.image.position = null;
      // this.uploadFinished.emit({
      //   file: this.state.image.originFile,
      //   type: this.type,
      // });
    }
  }

  /**
   * Reset image and cropper state after click to delete button
   */
  removeBackground() {
    this.state.croppedImagePreview = null;
    this.croppedImage = null;
    this.image = null;
    this.state.imagePreview = '';
    this.removed.emit(this.type);
  }

  /**
   * Close preview/cropper modal
   */
  closeModal(destroyCropper: boolean = true) {
    //this.modalService.close('image-preview' + this.image + this.type);
    this.state.hasCropper = !destroyCropper;
  }

  removeTargetValue(event: MouseEvent) {
    (event.target as HTMLInputElement).value = '';
  }

  private calcPositionToStore(factValues: any) {
    const imageComponent: any = document.querySelector('.ngx-ic-source-image');
    const { width, height } = imageComponent;
    return {
      x1: factValues.x1 / height,
      y1: factValues.y1 / width,
      x2: factValues.x2 / height,
      y2: factValues.y2 / width,
    };
  }
  private calcPositionFromStore(relativeValues: any) {
    const imageComponent: any = document.querySelector('.ngx-ic-source-image');
    const { width, height } = imageComponent;
    return {
      x1: relativeValues.x1 * height,
      y1: relativeValues.y1 * width,
      x2: relativeValues.x2 * height,
      y2: relativeValues.y2 * width,
    };
  }

  private addError(error: string) {
    if (error) {
      this.errorsList.push(error);
    }
  }
}
