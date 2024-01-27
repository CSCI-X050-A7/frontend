/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SchemaAuth {
  /** @default "123456" */
  password?: string;
  /** @default "demo" */
  username?: string;
}

export interface SchemaBook {
  /** @maxLength 255 */
  author: string;
  created_at?: string;
  id?: string;
  meta: SchemaMeta;
  status: number;
  /** @maxLength 255 */
  title: string;
  updated_at?: string;
  user_id: string;
}

export interface SchemaBookListResponse {
  count?: number;
  data?: SchemaBook[];
  limit?: number;
  offset?: number;
}

export interface SchemaCreateBook {
  /** @maxLength 255 */
  author: string;
  meta: SchemaMeta;
  status: number;
  /** @maxLength 255 */
  title: string;
  user_id: string;
}

export interface SchemaCreateUser {
  /** @maxLength 150 */
  email: string;
  /** @maxLength 100 */
  first_name: string;
  is_active?: boolean;
  is_admin?: boolean;
  /** @maxLength 100 */
  last_name: string;
  /**
   * @minLength 10
   * @maxLength 100
   */
  password: string;
  /**
   * @minLength 5
   * @maxLength 50
   */
  username: string;
}

export interface SchemaErrorResponse {
  msg?: string;
}

export interface SchemaJWT {
  admin?: boolean;
  exp?: number;
  user_id?: string;
}

export interface SchemaMeta {
  description?: string;
  picture?: string;
  /**
   * @min 1
   * @max 10
   */
  rating?: number;
}

export interface SchemaTokenResponse {
  access_token?: string;
  msg?: string;
  redirect_url?: string;
}

export interface SchemaUpdateUser {
  /** @maxLength 100 */
  first_name: string;
  is_active?: boolean;
  is_admin?: boolean;
  /** @maxLength 100 */
  last_name: string;
}

export interface SchemaUser {
  created_at?: string;
  email?: string;
  first_name?: string;
  id?: string;
  is_active?: boolean;
  is_admin?: boolean;
  last_name?: string;
  updated_at?: string;
  username?: string;
}

export interface SchemaUserListResponse {
  count?: number;
  data?: SchemaUser[];
  limit?: number;
  offset?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Fiber Go API
 * @version 1.0
 * @license MIT (https://opensource.org/licenses/MIT)
 * @contact
 *
 * Fiber go web framework based REST API boilerplate
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  admin = {
    /**
     * @description Get all users.
     *
     * @tags Admin
     * @name V1AdminUsersList
     * @summary get all users
     * @request GET:/api/v1/admin/users
     * @secure
     */
    v1AdminUsersList: (
      query?: {
        /** offset */
        offset?: number;
        /** limit */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemaUserListResponse[], SchemaErrorResponse>({
        path: `/api/v1/admin/users`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new user.
     *
     * @tags Admin
     * @name V1AdminUsersCreate
     * @summary create a new user
     * @request POST:/api/v1/admin/users
     * @secure
     */
    v1AdminUsersCreate: (createuser: SchemaCreateUser, params: RequestParams = {}) =>
      this.request<SchemaUser, SchemaErrorResponse>({
        path: `/api/v1/admin/users`,
        method: "POST",
        body: createuser,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description a user.
     *
     * @tags Admin
     * @name V1AdminUsersDetail
     * @summary get a user
     * @request GET:/api/v1/admin/users/{id}
     * @secure
     */
    v1AdminUsersDetail: (id: string, params: RequestParams = {}) =>
      this.request<SchemaUser, SchemaErrorResponse>({
        path: `/api/v1/admin/users/${id}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description first_name, last_name, is_active, is_admin only
     *
     * @tags Admin
     * @name V1AdminUsersUpdate
     * @summary update a user
     * @request PUT:/api/v1/admin/users/{id}
     * @secure
     */
    v1AdminUsersUpdate: (id: string, updateuser: SchemaUpdateUser, params: RequestParams = {}) =>
      this.request<SchemaUser, SchemaErrorResponse>({
        path: `/api/v1/admin/users/${id}`,
        method: "PUT",
        body: updateuser,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description delete user
     *
     * @tags Admin
     * @name V1AdminUsersDelete
     * @summary delete a user
     * @request DELETE:/api/v1/admin/users/{id}
     * @secure
     */
    v1AdminUsersDelete: (id: string, params: RequestParams = {}) =>
      this.request<object, SchemaErrorResponse>({
        path: `/api/v1/admin/users/${id}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * @description Get current JWT.
     *
     * @tags Auth
     * @name V1AuthJwtCreate
     * @summary JWT
     * @request POST:/api/v1/auth/jwt
     * @secure
     */
    v1AuthJwtCreate: (params: RequestParams = {}) =>
      this.request<SchemaJWT, SchemaErrorResponse>({
        path: `/api/v1/auth/jwt`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Set new access token to cookies and redirect. Demo username: demo, password: 123456
     *
     * @tags Auth
     * @name V1AuthLoginCreate
     * @summary login
     * @request POST:/api/v1/auth/login
     */
    v1AuthLoginCreate: (
      login: SchemaAuth,
      query?: {
        /** Redirect url after login */
        redirect_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemaTokenResponse, SchemaErrorResponse>({
        path: `/api/v1/auth/login`,
        method: "POST",
        query: query,
        body: login,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Clean cookies
     *
     * @tags Auth
     * @name V1AuthLogoutCreate
     * @summary Logout
     * @request POST:/api/v1/auth/logout
     * @secure
     */
    v1AuthLogoutCreate: (params: RequestParams = {}) =>
      this.request<object, SchemaErrorResponse>({
        path: `/api/v1/auth/logout`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  book = {
    /**
     * @description Get all books.
     *
     * @tags Book
     * @name V1BooksList
     * @summary get all books
     * @request GET:/api/v1/books
     */
    v1BooksList: (
      query?: {
        /** offset */
        offset?: number;
        /** limit */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemaBookListResponse, SchemaErrorResponse>({
        path: `/api/v1/books`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new book.
     *
     * @tags Book
     * @name V1BooksCreate
     * @summary create a new book
     * @request POST:/api/v1/books
     * @secure
     */
    v1BooksCreate: (createbook: SchemaCreateBook, params: RequestParams = {}) =>
      this.request<SchemaBook, SchemaErrorResponse>({
        path: `/api/v1/books`,
        method: "POST",
        body: createbook,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description a book.
     *
     * @tags Book
     * @name V1BooksDetail
     * @summary get a book
     * @request GET:/api/v1/books/{id}
     */
    v1BooksDetail: (id: string, params: RequestParams = {}) =>
      this.request<SchemaBook, SchemaErrorResponse>({
        path: `/api/v1/books/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description update book
     *
     * @tags Book
     * @name V1BooksUpdate
     * @summary update a book
     * @request PUT:/api/v1/books/{id}
     * @secure
     */
    v1BooksUpdate: (id: string, updatebook: SchemaBook, params: RequestParams = {}) =>
      this.request<SchemaBook, SchemaErrorResponse>({
        path: `/api/v1/books/${id}`,
        method: "PUT",
        body: updatebook,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description delete book
     *
     * @tags Book
     * @name V1BooksDelete
     * @summary delete a book
     * @request DELETE:/api/v1/books/{id}
     * @secure
     */
    v1BooksDelete: (id: string, params: RequestParams = {}) =>
      this.request<object, SchemaErrorResponse>({
        path: `/api/v1/books/${id}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description a user me.
     *
     * @tags User
     * @name V1UsersMeList
     * @summary get a user me
     * @request GET:/api/v1/users/me
     * @secure
     */
    v1UsersMeList: (params: RequestParams = {}) =>
      this.request<SchemaUser, SchemaErrorResponse>({
        path: `/api/v1/users/me`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
