import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";

export class Middleware {
  isTest = false;

  constructor(isTest = false) {
    this.isTest = isTest;
  }

  onRequest = (
    req: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    done();
  };
}
