import * as qs from 'qs';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  private readonly PATH = `${environment.api}`;

  constructor(private http: HttpClient) {}

  ngOnDestroy() {}

  private formatErrors = (error: any) => throwError(error); // see error interceptor
  private formatResponse = (response: { payload: unknown }) => response?.payload;

  get(path: string = '', params?: any): Observable<any> {
    let query = '';
    if (params) {
      query = qs.stringify(params, { arrayFormat: 'brackets' });
    }
    return this.http
      .get<{ payload: unknown }>(`${this.PATH}${path}${query && '?' + query}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http
      .put<{ payload: unknown }>(`${this.PATH}${path}`, body)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  patch(path: string, body: object = {}): Observable<any> {
    return this.http
      .patch<{ payload: unknown }>(`${this.PATH}${path}`, body)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  post(path: string, body: object = {}, options?: object): Observable<any> {
    return this.http
      .post<{ payload: unknown }>(`${this.PATH}${path}`, body, options)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  delete(path: string, body?: object): Observable<any> {
    return this.http
      .delete<{ payload: unknown }>(`${this.PATH}${path}`, body)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }
}
