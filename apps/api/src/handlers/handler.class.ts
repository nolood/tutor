import type { FastifyInstance } from "fastify";

export class Handler {
  api: FastifyInstance;
  prefix = "";

  constructor(api: FastifyInstance) {
    this.api = api;
  }

  protected init = () => {
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this),
    ).filter(
      (prop) =>
        typeof this[prop as keyof this] === "function" &&
        prop !== "constructor" &&
        prop !== "init",
    );

    methods.forEach((method) => {
      (this[method as keyof this] as () => void)();
    });
  };
}
