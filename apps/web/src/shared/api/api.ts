import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { env } from "~/env";
import { ZodSchema, ZodError } from "zod";

export class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: env?.API_URL });
  }

  protected async get<T>(
    url: string,
    schema: ZodSchema<T>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const data = await this.request<T>({ method: "GET", url, ...config });
    return this.validateResponse(schema, data);
  }

  protected async post<T, D = unknown>(
    url: string,
    data: D,
    requestSchema: ZodSchema<D>,
    responseSchema: ZodSchema<T>,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    this.validateRequest(requestSchema, data);

    const responseData = await this.request<T>({
      method: "POST",
      url,
      data,
      ...config,
    });

    return this.validateResponse(responseSchema, responseData);
  }

  protected async put<T, D = unknown>(
    url: string,
    data: D,
    requestSchema: ZodSchema<D>,
    responseSchema: ZodSchema<T>,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    this.validateRequest(requestSchema, data);

    const responseData = await this.request<T>({
      method: "PUT",
      url,
      data,
      ...config,
    });

    return this.validateResponse(responseSchema, responseData);
  }
  protected async delete<T>(
    url: string,
    schema: ZodSchema<T>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const data = await this.request<T>({ method: "DELETE", url, ...config });
    return this.validateResponse(schema, data);
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AxiosError(
          error.message,
          error.code,
          error.config,
          error.request,
          error.response
        );
      }
      throw error;
    }
  }

  private validateResponse<T>(schema: ZodSchema<T>, data: unknown): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Response validation failed: ${error.message}`);
      }
      throw error;
    }
  }

  private validateRequest<D>(schema: ZodSchema<D>, data: D): void {
    try {
      schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Request validation failed: ${error.message}`);
      }
      throw error;
    }
  }

  public setToken(accessToken: string, refreshToken: string): void {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    this.api.defaults.headers.common["x-refresh-token"] = refreshToken;
    this.api.interceptors.request.use((config) => config);
    this.api.interceptors.response.use((response) => response);
  }
}
