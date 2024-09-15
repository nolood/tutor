import type { FastifyReply, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";

import { Middleware } from "./middleware.class";

import { EErrors } from "~/constants/enums/error-enum";
import { env } from "~/env";
import type { IAuthenticatedRequest, TTokenPayload } from "~/types/types";
import { log } from "console";

export class AuthMiddleware extends Middleware {
  onRequest = (
    req: IAuthenticatedRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    if (env.NODE_ENV === "dev" && this.isTest) {
      done();
      return;
    }

    const tokenField = req.headers.authorization;
    const token = tokenField?.split(" ")[1];

    if (!token) {
      reply.status(401).send({ message: EErrors.AUTH_ERR });
      return;
    }

    const decoded = jwt.verify(token, env.SECRET_KEY) as TTokenPayload | null;
    if (!decoded) {
      reply.status(401).send({ message: EErrors.AUTH_ERR });
      return;
    }
    console.log(req, "req");
    console.log(decoded, "req");
    req.userId = decoded.id;

    done();
  };
}
