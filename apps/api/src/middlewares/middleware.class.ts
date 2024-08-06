import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";

export class Middleware {
  onRequest = (
    req: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    done();
  };
}
