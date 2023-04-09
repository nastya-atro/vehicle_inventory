import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { ApiService } from '../api.service';
import { VehiclesApi } from '../api/vehicles';

describe('VehicleApiService', () => {
  let vehicleService: VehiclesApi;
  let apiServiceDependency: ApiService;
  let spyHttp: any;

  // requests params
  let id: number;
  let params: any;

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
      providers: [VehiclesApi, { provide: ApiService, useValue: spyHttp }],
    });
    vehicleService = TestBed.inject(VehiclesApi);
    apiServiceDependency = TestBed.inject(ApiService);

    let SEGMENT = 'SEGMENT';
    Object.defineProperty(vehicleService, SEGMENT, { value: faker.random.word() });

    id = faker.datatype.number();
    params = {
      [faker.random.word()]: faker.random.numeric(),
      [faker.random.word()]: faker.random.numeric(),
    };

    bodyResponse.pipe().subscribe(response => (expectationResponse = response));
  });

  it('Check CarApiService creating', () => {
    expect(vehicleService).toBeTruthy();
  });

  it('Check getCarDetail Service', done => {
    const result = vehicleService.getCar(id);
    expect(apiServiceDependency.get).toHaveBeenCalled();
    expect(apiServiceDependency.get).toHaveBeenCalledWith(`${vehicleService['SEGMENT']}/${id}`);

    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check addNewCar Service', done => {
    const result = vehicleService.createCar(params);
    expect(apiServiceDependency.post).toHaveBeenCalled();
    expect(apiServiceDependency.post).toHaveBeenCalledWith(`${vehicleService['SEGMENT']}`, params);

    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check updateCar Service', done => {
    const result = vehicleService.editCar(id, params);
    expect(apiServiceDependency.put).toHaveBeenCalled();
    expect(apiServiceDependency.put).toHaveBeenCalledWith(`${vehicleService['SEGMENT']}/${id}`, params);

    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });

  it('Check removeTag Service', done => {
    const result = vehicleService.removeCar(id);
    expect(apiServiceDependency.delete).toHaveBeenCalled();
    expect(apiServiceDependency.delete).toHaveBeenCalledWith(`${vehicleService['SEGMENT']}/${id}`);

    expect(result).toBeTruthy();

    result.subscribe(response => {
      expect(response).toEqual(expectationResponse);
      done();
    });
  });
});
