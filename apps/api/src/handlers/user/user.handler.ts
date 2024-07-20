import type { FastifyReply, FastifyRequest } from "fastify";

import type { UserService } from "../../services/user/user.service";
import type { Logger } from "../../types/types";
import { Handler } from "../handler.class";

export class UserHandlers extends Handler {
  userService: UserService;

  constructor(log: Logger, userService: UserService) {
    super(log);

    this.userService = userService;
  }

  getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send(this.userService.getAll("kek"));
  };

  getOne = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Hello World" });
  };
}
