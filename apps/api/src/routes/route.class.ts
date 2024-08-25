import type {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";

import type { Handler } from "../handlers/handler.class";

import type { Middleware } from "~/middlewares/middleware.class";
import type { EModule } from "~/types/types";

interface RouteRegister {
  register: (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: HookHandlerDoneFunction,
  ) => void;
}

export abstract class Route<T extends Handler> implements RouteRegister {
  public name: EModule;

  protected handlers: T;
  public prefix: string;
  private middlewares?: Middleware[];

  constructor(handlers: T, name: EModule, middlewares?: Middleware[]) {
    this.name = name;
    this.handlers = handlers;
    this.prefix = "/" + name;
    this.middlewares = middlewares;
  }

  abstract defineRoutes(fastify: FastifyInstance): void;

  register(
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: HookHandlerDoneFunction,
  ) {
    if (this?.middlewares) {
      for (const middleware of this.middlewares) {
        fastify.addHook("onRequest", middleware.onRequest);
      }
    }

    this.defineRoutes(fastify);
    fastify.get("/test", this.handlers.test);

    done();
  }
}
