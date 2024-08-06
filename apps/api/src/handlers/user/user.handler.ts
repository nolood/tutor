import type { FastifyReply } from "fastify";

import type { UserService } from "../../services/user/user.service";
import type { EModule, IAuthenticatedRequest, Logger } from "../../types/types";
import { Handler } from "../handler.class";

export class UserHandlers extends Handler {
  userService: UserService;

  constructor(log: Logger, userService: UserService, name: EModule) {
    super(log, name);

    this.userService = userService;
  }

  getAll = async (req: IAuthenticatedRequest, reply: FastifyReply) => {
    const user = await this.userService.getAll();

    reply.send(user);
  };

  getOne = async (req: IAuthenticatedRequest, reply: FastifyReply) => {
    reply.send({ message: "Hello World" });
  };

  getSelf = async (req: IAuthenticatedRequest, reply: FastifyReply) => {
    const userId = this.getUserId(req);

    const user = await this.userService.getSelf(userId);

    reply.status(200).send(user);
  };
}
