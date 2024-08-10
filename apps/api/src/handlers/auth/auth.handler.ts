import type { FastifyReply, FastifyRequest } from "fastify";

import { Handler } from "../handler.class";

import type { AuthService } from "./../../services/auth/auth.service";
import type { TLoginDto, TRegisterDto } from "./dto/auth.dto";
import { loginDtoSchema } from "./dto/auth.dto";
import { registerDtoSchema } from "./dto/auth.dto";

import type { EModule, Logger } from "~/types/types";

export class AuthHandlers extends Handler {
  authService: AuthService;

  constructor(log: Logger, authService: AuthService, name: EModule) {
    super(log, name);

    this.authService = authService;
  }

  register = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = this.validate<TRegisterDto>(registerDtoSchema, req.body);

      const user = await this.authService.register(body);

      reply.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ message: error.message });
      }
    }
  };

  login = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = this.validate<TLoginDto>(loginDtoSchema, req.body);

      const user = await this.authService.login(body);
      reply.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ message: error.message });
      }
    }
  };
}
