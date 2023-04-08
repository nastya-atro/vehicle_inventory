import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { DragNDropDirective } from './dragNdrop.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalModule } from '../../modules/modal/modal.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ImageUploadComponent, DragNDropDirective],
  imports: [RouterModule, CommonModule, ModalModule, ImageCropperModule],
  exports: [ImageUploadComponent],
})
export class ImageUploadModule {}
