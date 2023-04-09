import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { faker } from '@faker-js/faker';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientDependency: HttpClient;
  let spyHttp: any;

  // requests params
  let path: string;
  let params: Params;
  let bodyRequest: {};

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

    spyHttp = jasmine.createSpyObj('HttpClient', apiMethods);

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: spyHttp }],
    });

    service = TestBed.inject(ApiService);
    httpClientDependency = TestBed.inject(HttpClient);

    let PATH = 'PATH';
    Object.defineProperty(service, PATH, { value: `/` });

    path = faker.random.word();
    params = {
      page: faker.random.numeric(),
      limit: faker.random.numeric(),
    };
    bodyRequest = {
      [faker.random.word()]: faker.random.word(),
    };
    bodyResponse.pipe(map(service['formatResponse'])).subscribe(response => (expectationResponse = response));
  });

  it('Check apiService creating', () => {
    expect(service).toBeTruthy();
  });

  it('Check Get HTTP Request without params', done => {
    const spy = service.get(path);
    expect(httpClientDependency.get).toHaveBeenCalled();
    expect(httpClientDependency.get).toHaveBeenCalledWith(`${service['PATH']}${path}`);
    expect(spy).toBeTruthy();

    spy.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check Error HTTP Request case handling', done => {
    spyHttp.get.and.returnValue(throwError(() => new Error('error')));
    const spy = service.get(path);
    spy.subscribe({
      error: err => {
        expect(err).toBeTruthy();
        done();
      },
    });
  });

  it('Check Get HTTP Request with params', done => {
    const result = service.get(path, params);
    expect(httpClientDependency.get).toHaveBeenCalled();
    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check Put HTTP Request', done => {
    const result = service.put(path, bodyRequest);
    expect(httpClientDependency.put).toHaveBeenCalled();
    expect(httpClientDependency.put).toHaveBeenCalledWith(`${service['PATH']}${path}`, bodyRequest);
    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check Patch HTTP Request', done => {
    const result = service.patch(path, bodyRequest);
    expect(httpClientDependency.patch).toHaveBeenCalled();
    expect(httpClientDependency.patch).toHaveBeenCalledWith(`${service['PATH']}${path}`, bodyRequest);
    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check Post HTTP Request', done => {
    const result = service.post(path, bodyRequest);
    expect(httpClientDependency.post).toHaveBeenCalled();
    expect(httpClientDependency.post).toHaveBeenCalledWith(`${service['PATH']}${path}`, bodyRequest, undefined);
    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check Delete HTTP Request', done => {
    const result = service.delete(path, bodyRequest);
    expect(httpClientDependency.delete).toHaveBeenCalled();
    expect(httpClientDependency.delete).toHaveBeenCalledWith(`${service['PATH']}${path}`, bodyRequest);
    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });
});
