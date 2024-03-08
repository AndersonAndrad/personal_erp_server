export interface PaginatedResponse<TypeEntity> extends ErrorResponse {
  items: TypeEntity[];
  quantityItems: number;
}

export interface ErrorResponse {
  error?: {
    message: string;
    code: string;
  };
}
