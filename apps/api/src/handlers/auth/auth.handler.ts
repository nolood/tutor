import type { AuthService } from "./../../services/auth/auth.service";
import { Handler } from "../handler.class";
import { EModule, Logger } from "~/types/types";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ICreateUserDto } from "../user/dto/user.dto";

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
      console.log("Request body:", req.body);
      const user = await this.authService.register({
        ...req.body,
      });
      reply.send(user);
    } catch (error) {
      console.error("Error in AuthHandlers.register:", error);
      if (error instanceof Error) {
        reply.status(500).send({ message: error.message });
      } else {
        // Обрабатываем ситуацию, когда ошибка не является экземпляром Error
        reply.status(500).send({ message: "Произошла неизвестная ошибка" });
      }
    }
  };
}
