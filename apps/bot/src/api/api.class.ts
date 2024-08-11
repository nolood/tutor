import type { AxiosInstance } from "axios";
import axios from "axios";
import type { ZodSchema } from "zod";

import { env } from "~/env";

export class Api {
  protected api: AxiosInstance;

  validate = <T>(schema: ZodSchema, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data;
  };

  constructor() {
    this.api = axios.create({
      baseURL: env.API_URL,
    });
  }
}
