export type Methods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'TRACE' | 'OPTIONS' | 'PATCH';
export type CacheStrategy = 'network_only' | 'network_first' | 'cache_only' | 'cache_first' | 'stale_while_revalidate';
export type CacheDuplicate = 'never' | 'always' | 'until_load' | 'auto';
export type QueryParameters = Record<string, string | number | boolean>;

export interface FetchOptions extends RequestInit {
  /**
   * Request URL.
   */
  url: string;

  /**
   * A string to set request's method.
   *
   * @default 'GET'
   */
  method?: Methods;

  /**
   * A timeout for the fetch request.
   * Set `0` for disable it.
   *
   * Use with cation, you will have memory leak issue in nodejs.
   *
   * @default 10_000 ms
   */
  timeout?: number;

  /**
   * If fetch response not acceptable or timed out, it will retry the request.
   *
   * @default 3
   */
  retry?: number;

  /**
   * Delay before each retries.
   *
   * @default 1_000 ms
   */
  retryDelay?: number;

  /**
   * Simple memory caching for remove duplicate/parallel requests.
   *
   * - `never`: Never use memory caching.
   * - `always`: Always use memory caching and remove all duplicate requests.
   * - `until_load`: Cache parallel requests until request completed (it will be removed after the promise resolved).
   * - `auto`: If CacheStorage was supported use `until_load` strategy else use `always`.
   *
   * @default 'never'
   */
  removeDuplicate?: CacheDuplicate;

  /**
   * Strategies for caching.
   *
   * - `network_only`: Only network request without any cache.
   * - `network_first`: Network first, falling back to cache.
   * - `cache_only`: Cache only without any network request.
   * - `cache_first`: Cache first, falling back to network.
   * - `stale_while_revalidate`: Fastest strategy, Use cached first but always request network to update the cache.
   *
   * @default 'network_only'
   */
  cacheStrategy?: CacheStrategy;

  /**
   * Revalidate callback for `stale_while_revalidate` cache strategy.
   */
  revalidateCallback?: (response: Response) => void | Promise<void>;

  /**
   * Cache storage custom name.
   */
  cacheStorageName?: string;

  /**
   * Body as JS Object.
   */
  bodyJson?: Record<string | number, unknown>;

  /**
   * URL Query Parameters as JS Object.
   */
  queryParameters?: QueryParameters;

  /**
   * Add token to Authentication bearer header.
   */
  token?: string;
}

export type AlwatrDocumentObject = {
  id: string;
  meta?: {
    rev: number;
    created: number;
    updated: number;
  };
};

export type AlwatrServiceResponseFailed = {
  ok: false;
  statusCode: number;
  errorCode: string;
  meta?: Record<string, unknown>;
  data?: never;
};

export type AlwatrServiceResponseSuccess<TData = Record<string, unknown>> = {
  ok: true;
  statusCode?: number;
  errorCode?: never;
  meta?: never;
  data: TData;
};

export type AlwatrServiceResponseSuccessWithMeta<TData = Record<string, unknown>, TMeta = Record<string, unknown>> = {
  ok: true;
  statusCode?: number;
  errorCode?: never;
  meta: TMeta;
  data: TData;
};

export type AlwatrServiceResponse<TData = Record<string, unknown>, TMeta = Record<string, unknown>> =
  | AlwatrServiceResponseSuccess<TData>
  | AlwatrServiceResponseSuccessWithMeta<TData, TMeta>
  | AlwatrServiceResponseFailed;

export type AlwatrDocumentMeta = {
  formatVersion: number;
  reversion: number;
  lastUpdated: number;
  lastAutoId: number;
};

export type AlwatrDocumentStorage<T extends AlwatrDocumentObject> = Omit<
  AlwatrServiceResponseSuccessWithMeta<Record<string, T | undefined>, AlwatrDocumentMeta>,
  'statusCode' | 'errorCode'
>;
