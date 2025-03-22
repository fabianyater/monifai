export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  url: string;
  timestamp: number;
}