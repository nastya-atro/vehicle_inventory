import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ResponseError } from '../../../core/models/response-error.model';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor() {}
  private formatErrors = (error: ResponseError) => throwError(error); // see error interceptor
}
