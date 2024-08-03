import type { AuthService } from "./../../services/auth/auth.service";
import { Handler } from "../handler.class";
import { EModule, Logger } from "~/types/types";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ICreateUserDto, ILoginUserDto } from "../user/dto/user.dto";

export class AuthHandlers extends Handler {
  authService: AuthService;

  constructor(log: Logger, authService: AuthService, name: EModule) {
    super(log, name);

    this.authService = authService;
  }

  register = async (
    req: FastifyRequest<{ Body: ICreateUserDto }>,
    reply: FastifyReply
  ) => {
    try {
      if (!req.body.email || !req.body.password || !req.body.password) {
        reply
          .status(400)
          .send({ message: "Поля email, пароль и пароль обязательны" });
      }
      const user = await this.authService.register({
        ...req.body,
      });
      reply.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ message: error.message });
      }
    }
  };
  login = async (
    req: FastifyRequest<{ Body: ILoginUserDto }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await this.authService.login({ ...req.body });
      reply.send(user);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ message: error.message });
      }
    }
  };
}
