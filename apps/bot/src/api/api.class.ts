import type { AxiosInstance } from "axios";
import axios from "axios";

import { env } from "~/env";

export class Api {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: env.API_URL,
    });
  }
}
