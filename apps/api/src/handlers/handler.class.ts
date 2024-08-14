import type { FastifyReply, FastifyRequest } from "fastify";
import type { ZodSchema } from "zod";

import type { IAuthenticatedRequest, Logger } from "../types/types";

import { EErrors } from "~/constants/enums/error-enum";

export class Handler {
  protected log: Logger;

  constructor(log: Logger) {
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

  test = (req: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send(true);
  };
}
