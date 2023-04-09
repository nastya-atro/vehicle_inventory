import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { AuthApi } from '../api/auth.api';

describe('AuthenticationApiService', () => {
  let authService: AuthApi;
  let apiServiceDependency: ApiService;
  let spyHttp: any;

  // reality response params
  let bodyResponse: Observable<any>;

  // expectation response params
  let expectationResponse: any;

  beforeEach(() => {
    bodyResponse = of({
      payload: { [faker.random.word()]: faker.random.word() },
    });

    const apiMethods = {
      post: bodyResponse,
      get: bodyResponse,
      put: bodyResponse,
      delete: bodyResponse,
      patch: bodyResponse,
    };

    spyHttp = jasmine.createSpyObj('ApiService', apiMethods);

    TestBed.configureTestingModule({
      providers: [AuthApi, { provide: ApiService, useValue: spyHttp }],
    });
    authService = TestBed.inject(AuthApi);
    apiServiceDependency = TestBed.inject(ApiService);

    let SEGMENT = 'SEGMENT';
    Object.defineProperty(authService, SEGMENT, { value: faker.random.word() });

    bodyResponse.pipe().subscribe(response => (expectationResponse = response));
  });

  it('Check AuthenticationApiService creating', () => {
    expect(authService).toBeTruthy();
  });

  it('Check login Service method', done => {
    const username = faker.random.word();
    const password = faker.random.word();

    const result = authService.login(username, password);
    expect(apiServiceDependency.post).toHaveBeenCalled();
    expect(apiServiceDependency.post).toHaveBeenCalledWith(`${authService['SEGMENT']}/login`, { username, password });

    expect(result).toBeTruthy();
    bodyResponse.pipe(map(authService['formatResponse'])).subscribe(response => (expectationResponse = response));

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check Error login Service method handling', done => {
    spyHttp.post.and.returnValue(throwError(() => new Error('error')));

    const username = faker.random.word();
    const password = faker.random.word();

    const result = authService.login(username, password);
    result.subscribe({
      error: err => {
        expect(err).toBeTruthy();
        done();
      },
    });
  });

  it('Check logout Service method', done => {
    const result = authService.logout();
    expect(apiServiceDependency.get).toHaveBeenCalled();
    expect(apiServiceDependency.get).toHaveBeenCalledWith(`${authService['SEGMENT']}/logout`);

    expect(result).toBeTruthy();
    bodyResponse.pipe(map(authService['formatResponse'])).subscribe(response => (expectationResponse = response));

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });
});
