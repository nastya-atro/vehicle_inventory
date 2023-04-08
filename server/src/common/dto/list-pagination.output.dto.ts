import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ListPaginationOutputDto<T> {
  @Expose()
  results: T[];

  @Expose()
  totalPages: number;

  @Expose()
  total: number;

  @Expose()
  sortOrder: string;

  @Expose()
  sortBy: string;

  @Expose()
  limit: number;

  @Expose()
  page: number;
}
