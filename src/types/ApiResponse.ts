export interface ApiResponse<T> {
    success: string;
    data: T;
    message?: string;
    error?: string;
    status?: number;
    statusText?: string;
  }
  