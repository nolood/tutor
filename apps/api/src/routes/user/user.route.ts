import type { FastifyInstance } from "fastify";

import type { UserHandlers } from "../../handlers/user/user.handler";
import { Route } from "../route.class";

export class UserRoutes extends Route<UserHandlers> {
  public defineRoutes = (fastify: FastifyInstance) => {
    fastify.get("/all", this.handlers.getAll);
    fastify.get("/one", this.handlers.getOne);
    fastify.get("/self", this.handlers.getSelf);
  };
}
