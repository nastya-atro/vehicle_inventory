import { CAR_TYPES } from '../enums/vehicle.enum';

export const CARS_COLUMNS = ['', 'Vehicle name', 'Last Connection', 'Car Type', ''];

export const SORT_BY_CARS_LIST = {
  title: 'Sort By',
  name: 'sortBy',
  queryName: 'sortBy',
  options: [
    { name: 'ID \u2191', value: 'id_ASC' },
    { name: 'ID \u2193', value: 'id_DESC' },
  ],
};

export const VEHICLE_DEFAULT_FILTERS = {
  sortBy: { name: 'ID \u2191', value: 'id_ASC' },
};

export const CAR_TYPES_FILTER = [
  { id: 1, title: CAR_TYPES.SUV },
  { id: 2, title: CAR_TYPES.Truck },
  { id: 3, title: CAR_TYPES.Hybrid },
];
