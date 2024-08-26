import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { env } from "~/env";

export class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: env.API_URL });
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: 'GET', url, ...config });
  }

  protected async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.request<T>({ method: 'POST', url, data, ...config });
  }

  protected async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data, ...config });
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, ...config });
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

  public setToken(token: string): void {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.api.interceptors.request.use((config) => config);
    this.api.interceptors.response.use((response) => response);
  }
}
