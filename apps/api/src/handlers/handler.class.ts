import type { ZodSchema } from "zod";

import type { EModule, IAuthenticatedRequest, Logger } from "../types/types";

import { EErrors } from "~/constants/enums/error-enum";

export class Handler {
  public name: EModule;

  protected log: Logger;

  constructor(log: Logger, name: EModule) {
    this.name = name;
    this.log = log;
  }

  getUserId = (req: IAuthenticatedRequest) => {
    const userId = req?.userId;

    if (!userId) {
      throw new Error(EErrors.AUTH_ERR);
    }

    return userId;
  };

  validate = <T>(schema: ZodSchema, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data;
  };
}
