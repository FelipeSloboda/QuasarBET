export interface ApiErrorItem {
  field: string;
  code: string;
  message: string;
}

export interface ApiResponse<TData> {
  success: boolean;
  message: string;
  data: TData | null;
  errors: ApiErrorItem[];
  meta: unknown;
}