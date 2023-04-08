import { Order } from '../enums/filters.enum';

export interface QueryParams {
  page: any;
  limit: any;
  sortBy: string;
  sortOrder: Order.ASC | Order.DESC;
  [p: string]: any;
}

export interface FilterOptions {
  id: number;
  title: string;
}
