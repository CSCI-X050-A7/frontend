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
  password?: string
  /** @default "demo" */
  username?: string
}

export interface SchemaCreateUser {
  /** @maxLength 150 */
  email: string
  /** @maxLength 100 */
  first_name: string
  is_active?: boolean
  is_admin?: boolean
  /** @maxLength 100 */
  last_name: string
  /**
   * @minLength 10
   * @maxLength 100
   */
  password: string
  /**
   * @minLength 5
   * @maxLength 50
   */
  username: string
}

export interface SchemaErrorResponse {
  msg?: string
}

export interface SchemaJWT {
  admin?: boolean
  exp?: number
  user_id?: string
}

export interface SchemaMovie {
  /** @maxLength 255 */
  cast: string
  /** @maxLength 255 */
  category: string
  /** @maxLength 255 */
  director: string
  id?: string
  /** @maxLength 255 */
  producer: string
  /** @maxLength 255 */
  rating_code: string
  /** @maxLength 255 */
  reviews: string
  /** @maxLength 255 */
  show_time: string
  /** @maxLength 255 */
  synopsis: string
  /** @maxLength 255 */
  title: string
  /** @maxLength 1023 */
  trailer_picture: string
  /** @maxLength 1023 */
  trailer_video: string
}

export interface SchemaMovieListResponse {
  count?: number
  data?: SchemaMovie[]
  limit?: number
  offset?: number
}

export interface SchemaTokenResponse {
  access_token?: string
  msg?: string
  redirect_url?: string
}

export interface SchemaUpdateUser {
  /** @maxLength 100 */
  first_name: string
  is_active?: boolean
  is_admin?: boolean
  /** @maxLength 100 */
  last_name: string
}

export interface SchemaUpsertMovie {
  /** @maxLength 255 */
  cast: string
  /** @maxLength 255 */
  category: string
  /** @maxLength 255 */
  director: string
  /** @maxLength 255 */
  producer: string
  /** @maxLength 255 */
  rating_code: string
  /** @maxLength 255 */
  reviews: string
  show_time: string
  /** @maxLength 255 */
  synopsis: string
  /** @maxLength 255 */
  title: string
  /** @maxLength 1023 */
  trailer_picture: string
  /** @maxLength 1023 */
  trailer_video: string
}

export interface SchemaUser {
  created_at?: string
  email?: string
  first_name?: string
  id?: string
  is_active?: boolean
  is_admin?: boolean
  last_name?: string
  updated_at?: string
  username?: string
}

export interface SchemaUserListResponse {
  count?: number
  data?: SchemaUser[]
  limit?: number
  offset?: number
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter(
      key => 'undefined' !== typeof query[key]
    )
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
  }

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

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
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {})
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body)
      }
    ).then(async response => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch(e => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Fiber Go API
 * @version 1.0
 * @license MIT (https://opensource.org/licenses/MIT)
 * @contact
 *
 * Fiber go web framework based REST API boilerplate
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
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
        offset?: number
        /** limit */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<SchemaUserListResponse[], SchemaErrorResponse>({
        path: `/api/v1/admin/users`,
        method: 'GET',
        query: query,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
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
    v1AdminUsersCreate: (
      createuser: SchemaCreateUser,
      params: RequestParams = {}
    ) =>
      this.request<SchemaUser, SchemaErrorResponse>({
        path: `/api/v1/admin/users`,
        method: 'POST',
        body: createuser,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
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
        method: 'GET',
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
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
    v1AdminUsersUpdate: (
      id: string,
      updateuser: SchemaUpdateUser,
      params: RequestParams = {}
    ) =>
      this.request<SchemaUser, SchemaErrorResponse>({
        path: `/api/v1/admin/users/${id}`,
        method: 'PUT',
        body: updateuser,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
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
        method: 'DELETE',
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
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
        method: 'POST',
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
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
        redirect_url?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SchemaTokenResponse, SchemaErrorResponse>({
        path: `/api/v1/auth/login`,
        method: 'POST',
        query: query,
        body: login,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

      /**
       * @description Request to change user's password.
       *
       * @tags Auth
       * @name V1ChangePassword
       * @summary change password
       * @request PUT:/api/v1/auth/change-password
       */
      v1ChangePassword: (
       passwords: { oldPassword: string, newPassword: string },
      params: RequestParams = {}
    ) =>
      this.request<void, SchemaErrorResponse>({
      path: `/api/v1/auth/change-password`,
      method: 'PUT',
      body: passwords, // Send oldPassword and newPassword in the request body
      type: ContentType.Json,
      format: 'json',
      ...params
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
        method: 'POST',
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  movie = {
    /**
     * @description Get all movies.
     *
     * @tags Movie
     * @name V1MoviesList
     * @summary get all movies
     * @request GET:/api/v1/movies
     */
    v1MoviesList: (
      query?: {
        /** offset */
        offset?: number
        /** limit */
        limit?: number
        /** search by title */
        search?: string
        /** the movie is running or not */
        running?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<SchemaMovieListResponse, SchemaErrorResponse>({
        path: `/api/v1/movies`,
        method: 'GET',
        query: query,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Create a new movie.
     *
     * @tags Movie
     * @name V1MoviesCreate
     * @summary create a new movie
     * @request POST:/api/v1/movies
     * @secure
     */
    v1MoviesCreate: (movie: SchemaUpsertMovie, params: RequestParams = {}) =>
      this.request<SchemaMovie, SchemaErrorResponse>({
        path: `/api/v1/movies`,
        method: 'POST',
        body: movie,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description a movie.
     *
     * @tags Movie
     * @name V1MoviesDetail
     * @summary get a movie
     * @request GET:/api/v1/movies/{id}
     */
    v1MoviesDetail: (id: string, params: RequestParams = {}) =>
      this.request<SchemaMovie, SchemaErrorResponse>({
        path: `/api/v1/movies/${id}`,
        method: 'GET',
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description update movie
     *
     * @tags Movie
     * @name V1MoviesUpdate
     * @summary update a movie
     * @request PUT:/api/v1/movies/{id}
     * @secure
     */
    v1MoviesUpdate: (
      id: string,
      updatemovie: SchemaMovie,
      params: RequestParams = {}
    ) =>
      this.request<SchemaMovie, SchemaErrorResponse>({
        path: `/api/v1/movies/${id}`,
        method: 'PUT',
        body: updatemovie,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description delete movie
     *
     * @tags Movie
     * @name V1MoviesDelete
     * @summary delete a movie
     * @request DELETE:/api/v1/movies/{id}
     * @secure
     */
    v1MoviesDelete: (id: string, params: RequestParams = {}) =>
      this.request<object, SchemaErrorResponse>({
        path: `/api/v1/movies/${id}`,
        method: 'DELETE',
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
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
        method: 'GET',
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  misc = {
    /**
     * No description
     *
     * @tags Misc
     * @name V1VersionList
     * @summary get current software version
     * @request GET:/api/v1/version
     */
    v1VersionList: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/version`,
        method: 'GET',
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
}
