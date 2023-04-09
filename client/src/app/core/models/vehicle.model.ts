import { FormControl } from '@angular/forms';

export interface CreateCarRequest {
  name: string;
  longitude: number | null;
  latitude: number | null;
  type: number;
}

export interface EditCarRequest {
  name: string;
  longitude: number | null;
  latitude: number | null;
  type: number;
}

export interface CarsList {
  id: number;
  name: string;
  createDate: string;
  updateDate: string;
  longitude: number;
  latitude: number;
  lastConnection: string;
  image: string;
  typeName: string;
}

export interface CarsListResponse extends CarsList {}

export interface Car {
  id: number;
  name: string;
  createDate: string;
  updateDate: string;
  lastConnection: string;
  longitude: number | null;
  latitude: number | null;
  image: string;
  originImage: string;
  typeId: number;
  imageCropSettings: any;
}

export interface CarResponse extends Car {}

export interface CarResolverData {
  vehicleComponentData: CarResponse;
}
