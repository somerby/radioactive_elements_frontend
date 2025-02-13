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

export interface ElementForDecay {
  /** Element id */
  element_id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /** Status */
  status?: "active" | "deleted";
  /**
   * Img url
   * @maxLength 100
   */
  img_url?: string | null;
}

export interface ElementDecay {
  /** ID */
  id?: number;
  element?: ElementForDecay;
  /**
   * Quantity
   * @maxLength 30
   */
  quantity?: string | null;
  /**
   * Remaining quantity
   * @minLength 1
   */
  remaining_quantity?: string | null;
  /** Decay */
  decay?: number;
}

export interface Decay {
  /** Decay id */
  decay_id?: number;
  elements?: ElementDecay[];
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /** Status */
  status?: "draft" | "deleted" | "completed" | "formed" | "rejected";
  /**
   * Date of creation
   * @format date-time
   */
  date_of_creation?: string;
  /**
   * Date of formation
   * @format date-time
   */
  date_of_formation?: string | null;
  /**
   * Date of finish
   * @format date-time
   */
  date_of_finish?: string | null;
  /**
   * Pass time
   * @maxLength 30
   */
  pass_time?: string | null;
}

export interface Element {
  /** Element id */
  element_id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /** Status */
  status: "active" | "deleted";
  /**
   * Img url
   * @maxLength 100
   */
  img_url?: string | null;
  /**
   * Period time text
   * @minLength 1
   * @maxLength 100
   */
  period_time_text: string;
  /** Period time */
  period_time: number;
  /**
   * Atomic mass
   * @min -2147483648
   * @max 2147483647
   */
  atomic_mass: number;
}

export interface CustomUser {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 254
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface SwaggerCustomUser {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 254
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Radioactive Elements API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * My description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  decay = {
    /**
     * No description
     *
     * @tags decay
     * @name DecayRead
     * @request GET:/decay/{decay_id}/
     * @secure
     */
    decayRead: (decayId: string, params: RequestParams = {}) =>
      this.request<
        Decay,
        {
          details: string;
        }
      >({
        path: `/decay/${decayId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags decay
     * @name DecayUpdate
     * @request PUT:/decay/{decay_id}/
     * @secure
     */
    decayUpdate: (
      decayId: string,
      data: {
        pass_time?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status: string;
        },
        {
          details: string;
        }
      >({
        path: `/decay/${decayId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags decay
     * @name DecayFormingUpdate
     * @request PUT:/decay/{decay_id}/forming/
     * @secure
     */
    decayFormingUpdate: (decayId: string, params: RequestParams = {}) =>
      this.request<
        Decay,
        {
          details: string;
        }
      >({
        path: `/decay/${decayId}/forming/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags decay
     * @name DecayFormingDelete
     * @request DELETE:/decay/{decay_id}/forming/
     * @secure
     */
    decayFormingDelete: (decayId: string, params: RequestParams = {}) =>
      this.request<
        Decay,
        {
          details: string;
        }
      >({
        path: `/decay/${decayId}/forming/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags decay
     * @name DecayModerateUpdate
     * @request PUT:/decay/{decay_id}/moderate/
     * @secure
     */
    decayModerateUpdate: (
      decayId: string,
      data: {
        accept: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Decay,
        {
          details: string;
        }
      >({
        path: `/decay/${decayId}/moderate/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  decays = {
    /**
     * No description
     *
     * @tags decays
     * @name DecaysList
     * @request GET:/decays/
     * @secure
     */
    decaysList: (
      query?: {
        /** Начальная дата */
        start_date?: string;
        /** Конечная дата */
        end_date?: string;
        /** Статус (completed/formed/rejected) */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Decay[],
        {
          details: string;
        }
      >({
        path: `/decays/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  elementDecay = {
    /**
     * No description
     *
     * @tags element_decay
     * @name ElementDecayUpdate
     * @request PUT:/element_decay/{element_id}/{decay_id}/
     * @secure
     */
    elementDecayUpdate: (
      elementId: string,
      decayId: string,
      data: {
        quantity?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ElementDecay[],
        {
          details: string;
        }
      >({
        path: `/element_decay/${elementId}/${decayId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags element_decay
     * @name ElementDecayDelete
     * @request DELETE:/element_decay/{element_id}/{decay_id}/
     * @secure
     */
    elementDecayDelete: (elementId: string, decayId: string, params: RequestParams = {}) =>
      this.request<
        ElementDecay[],
        {
          details: string;
        }
      >({
        path: `/element_decay/${elementId}/${decayId}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  elements = {
    /**
     * No description
     *
     * @tags elements
     * @name ElementsList
     * @request GET:/elements/
     * @secure
     */
    elementsList: (
      query?: {
        /** Атомная масса */
        atomic_mass?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          atomic_mass: string;
          elements: {
            element_id: number;
            name: string;
            description: string;
            status: string;
            img_url: string;
            period_time_text: string;
            period_time: number;
            atomic_mass: number;
          }[];
          decay_information: {
            decay_elements_count: number;
            decay_id: number;
          };
        },
        any
      >({
        path: `/elements/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags elements
     * @name ElementsCreate
     * @request POST:/elements/
     * @secure
     */
    elementsCreate: (data: Element, params: RequestParams = {}) =>
      this.request<
        Element,
        {
          details: string;
        }
      >({
        path: `/elements/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags elements
     * @name ElementsRead
     * @request GET:/elements/{element_id}/
     * @secure
     */
    elementsRead: (elementId: string, params: RequestParams = {}) =>
      this.request<
        Element,
        {
          details: string;
        }
      >({
        path: `/elements/${elementId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags elements
     * @name ElementsCreate2
     * @request POST:/elements/{element_id}/
     * @originalName elementsCreate
     * @duplicate
     * @secure
     */
    elementsCreate2: (elementId: string, params: RequestParams = {}) =>
      this.request<
        {
          decay_information?: {
            decay_id?: number;
            decay_elements_count?: number;
          };
        },
        {
          details: string;
        }
      >({
        path: `/elements/${elementId}/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags elements
     * @name ElementsUpdate
     * @request PUT:/elements/{element_id}/
     * @secure
     */
    elementsUpdate: (elementId: string, data: Element, params: RequestParams = {}) =>
      this.request<
        Element,
        {
          details: string;
        }
      >({
        path: `/elements/${elementId}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags elements
     * @name ElementsDelete
     * @request DELETE:/elements/{element_id}/
     * @secure
     */
    elementsDelete: (elementId: string, params: RequestParams = {}) =>
      this.request<
        Element,
        {
          details: string;
        }
      >({
        path: `/elements/${elementId}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags elements
     * @name ElementsAddImgCreate
     * @request POST:/elements/{element_id}/add_img/
     * @secure
     */
    elementsAddImgCreate: (
      elementId: string,
      data: {
        /** @format binary */
        img: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Element,
        {
          details: string;
        }
      >({
        path: `/elements/${elementId}/add_img/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserAccountUpdate
     * @request PUT:/user/account/
     * @secure
     */
    userAccountUpdate: (
      data: {
        email?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CustomUser,
        {
          details: string;
        }
      >({
        path: `/user/account/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login/
     * @secure
     */
    userLoginCreate: (data: SwaggerCustomUser, params: RequestParams = {}) =>
      this.request<
        CustomUser,
        {
          details: string;
        }
      >({
        path: `/user/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout/
     * @secure
     */
    userLogoutCreate: (params: RequestParams = {}) =>
      this.request<
        {
          status: string;
        },
        {
          details: string;
        }
      >({
        path: `/user/logout/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegistrationCreate
     * @request POST:/user/registration/
     * @secure
     */
    userRegistrationCreate: (data: SwaggerCustomUser, params: RequestParams = {}) =>
      this.request<
        CustomUser,
        {
          details: string;
        }
      >({
        path: `/user/registration/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
