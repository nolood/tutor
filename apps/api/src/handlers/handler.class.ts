import type { FastifyRequest, FastifyReply } from "fastify";
import type { EModule, Logger } from "../types/types";

export abstract class Handler {
  public name: EModule;

  protected log: Logger;

  constructor(log: Logger, name: EModule) {
    this.name = name;
    this.log = log;
  }

  abstract register(req: FastifyRequest, reply: FastifyReply): Promise<void>;
}
