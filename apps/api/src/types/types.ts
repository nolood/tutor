import type logger from "@repo/logger";
import type { FastifyRequest } from "fastify";

export type Logger = typeof logger;

export enum EModule {
  AUTH = "auth",
  BOT = "bot",
  USER = "user",
}

export type TTokenPayload = {
  email: string;
  id: string;
};

export interface IAuthenticatedRequest extends FastifyRequest {
  userId?: string;
}
