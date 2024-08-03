import type { FastifyReply, FastifyRequest } from "fastify";

import type { UserService } from "../../services/user/user.service";
import type { EModule, Logger } from "../../types/types";
import { Handler } from "../handler.class";

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
}
