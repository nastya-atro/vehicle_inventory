export interface PaginationRequest {
  limit?: any;
  page?: any;
  offset?: any;
}

export interface Pagination {
  limit: number;
  page: number;
  offset: number;
}

export interface Order {
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
}
