import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../api.service';
import { ResponseError } from '../../models/response-error.model';
import { catchError, map } from 'rxjs/operators';
import { CreateUserRequest } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  SEGMENT = '/auth';
  constructor(private api: ApiService) {}

  private formatErrors = (error: ResponseError) => throwError(error); // see error interceptor
  private formatResponse = (response: { payload: unknown }) => response?.payload;

  login(username: string, password: string): Observable<unknown> {
    return this.api
      .post(`${this.SEGMENT}/login`, { username, password })
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  logout(): Observable<unknown> {
    return this.api.get(`${this.SEGMENT}/logout`).pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  signup(user: CreateUserRequest): Observable<string> {
    return this.api.post(`${this.SEGMENT}/signup`, user);
  }

  getUserInfo(token: string): Observable<{ email: string; phone: string }> {
    return this.api.get(`${this.SEGMENT}/activate-profile?token=${token}`);
  }

  activate(token: string): Observable<unknown> {
    return this.api
      .get(`${this.SEGMENT}/activate?token=${token}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  developActivate(token: string): Observable<unknown> {
    return this.api
      .get(`${this.SEGMENT}/develop-activate?token=${token}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  sendConfirmEmailToken(token: string): Observable<unknown> {
    return this.api
      .get(`${this.SEGMENT}/validate-email?token=${token}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }
}
