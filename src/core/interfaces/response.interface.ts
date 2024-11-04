export interface PaginatedRequest {
  page: number;
  itemsPerPage: number;
}

export interface PaginatedResponse<TypeEntity> extends ErrorResponse {
  items: TypeEntity[];
  meta: Meta;
}

export interface ErrorResponse {
  error?: {
    message: string;
    code: string;
  };
}

interface Meta {
  quantityItems: number;
  /**
   * @todo - implement like required and refact all implementations
   */
  totalPages?: number;
}
