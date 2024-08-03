import type { AuthHandlers } from "~/handlers/auth/auth.handler";
import { Route } from "../route.class";
import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ICreateUserDto } from "~/handlers/user/dto/user.dto";

export class AuthRoutes extends Route<AuthHandlers> {
  public register = (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void
  ) => {
    fastify.post(
      this.getPath("/register"),
      (req: FastifyRequest<{ Body: ICreateUserDto }>, reply: FastifyReply) =>
        this.handlers.register(req, reply)
    );
    fastify.post(
      this.getPath("/login"),
      (req: FastifyRequest<{ Body: ICreateUserDto }>, reply: FastifyReply) =>
        this.handlers.login(req, reply)
    );
    done();
  };
}
