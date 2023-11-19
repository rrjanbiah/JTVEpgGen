export type TApiEndpoint = (...args: unknown[]) => string;

export interface IApiResponse {
  statusCode: number;
  headers: { [key: string]: string };
  body: string;
}

export interface IRequestOptions {
  method?: string;
  data?: unknown;
}
