export interface ResponseListInterface<T> {
  results: Array<T>;
  limit: number;
  page: number;
  sortBy: string;
  sortOrder: string;
  total: number;
  totalPages: number;
}
