import type { FastifyInstance, FastifyPluginOptions } from "fastify";

import type { UserHandlers } from "../../handlers/user/user.handler";
import { Route } from "../route.class";

export class UserRoutes extends Route<UserHandlers> {
  public register = (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    fastify.get(this.getPath("/all"), this.handlers.getAll);
    fastify.get(this.getPath("/one"), this.handlers.getOne);
    done();
  };
}
