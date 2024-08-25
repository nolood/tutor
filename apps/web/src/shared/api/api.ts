import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { env } from "~/env";

export class Api {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({ baseURL: env.API_URL });
  }

  protected async send<T, K>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig<T>
  ): Promise<K> {
    try {
      const response: AxiosResponse<K> = await this.api.request<K>({
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
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
    const headers = {
      ...this.api.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    };
    this.api.defaults.headers.common = { ...headers };
    this.api.interceptors.request.use((config) => {
      return config;
    });
    this.api.interceptors.response.use((config) => {
      return config;
    });
  }
}
