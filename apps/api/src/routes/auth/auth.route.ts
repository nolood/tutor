import type { FastifyInstance } from "fastify";

import { Route } from "../route.class";

import type { AuthHandlers } from "~/handlers/auth/auth.handler";

export class AuthRoutes extends Route<AuthHandlers> {
  public defineRoutes = (fastify: FastifyInstance) => {
    fastify.post("/register", this.handlers.register);
    fastify.post("/login", this.handlers.login);
  };
}
