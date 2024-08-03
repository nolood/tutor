import type { FastifyInstance, FastifyPluginOptions } from "fastify";

import type { Handler } from "../handlers/handler.class";

import type { EModule } from "~/types/types";

interface RouteRegister {
  register: (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => void;
}

export class Route<T extends Handler> implements RouteRegister {
  public name: EModule;

  protected handlers: T;
  protected prefix: string;

  constructor(handlers: T, prefix: string, name: EModule) {
    this.name = name;
    this.handlers = handlers;
    this.prefix = prefix;
  }

  register = (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    done();
  };

  protected getPath = (path: string) => {
    return this.prefix + path;
  };
}
