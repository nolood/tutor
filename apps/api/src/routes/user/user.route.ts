import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

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
    fastify.get(
      this.getPath("/getSelf"),
      (req: FastifyRequest, reply: FastifyReply) =>
        this.handlers.getSelf(req, reply),
    );
    done();
  };
}
