export interface Response<T = null> {
  success: boolean;
  message: string;
  token: string;
  data: T;
}
export interface IApiError {
  status: string;
  message: string;
  errors: string[];
}
export interface PaginatedResponse<T> {
  message: string;
  data: {
    docs: Array<T>;
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
  status: number;
}
