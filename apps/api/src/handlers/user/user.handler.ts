import type { FastifyReply, FastifyRequest } from "fastify";

import type { UserService } from "../../services/user/user.service";
import type { EModule, Logger } from "../../types/types";
import { Handler } from "../handler.class";
import { ERROR } from "~/constants/enums/error-enum";

export class UserHandlers extends Handler {
  register(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error("Method not implemented.");
  }
  userService: UserService;

  constructor(log: Logger, userService: UserService, name: EModule) {
    super(log, name);

    this.userService = userService;
  }

  getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = await this.userService.getAll();

    reply.send(user);
  };

  getOne = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Hello World" });
  };
  getSelf = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        reply.status(401).send(ERROR.TOKEN_ERR);
        return;
      }
      const user = await this.userService.getSelf(token);
      reply.status(200).send(user);
    } catch (error) {
      this.log.info(error);
      reply.status(500).send(error);
    }
  };
}
