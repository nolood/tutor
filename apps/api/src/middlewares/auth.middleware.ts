import type { FastifyReply, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";

import { Middleware } from "./middleware.class";

import { EErrors } from "~/constants/enums/error-enum";
import { env } from "~/env";
import type { IAuthenticatedRequest, TTokenPayload } from "~/types/types";

export class AuthMiddleware extends Middleware {
  onRequest = async (req: IAuthenticatedRequest, reply: FastifyReply) => {
    if (env.NODE_ENV === "dev" && this.isTest) {
      return;
    }

    const tokenField = req.headers.authorization;
    const token = tokenField?.split(" ")[1];

    if (!token) {
      reply.status(401).send({ message: EErrors.AUTH_ERR });
      return;
    }

    try {
      const decoded = jwt.verify(token, env.SECRET_KEY) as TTokenPayload;
      req.userId = decoded.id;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        const refreshToken = req.headers["x-refresh-token"] as string;
        if (!refreshToken) {
          reply.status(401).send({ message: EErrors.REFRESH_TOKEN_REQUIRED });
          return;
        }

        try {
          const refreshDecoded = jwt.verify(
            refreshToken,
            env.REFRESH_SECRET_KEY
          ) as TTokenPayload;

          const newAccessToken = jwt.sign(
            { id: refreshDecoded.id },
            env.SECRET_KEY,
            {
              expiresIn: "15m",
            }
          );

          reply.header("x-access-token", newAccessToken);

          req.userId = refreshDecoded.id;
        } catch (refreshErr) {
          reply.status(401).send({ message: EErrors.INVALID_REFRESH_TOKEN });
        }
      } else {
        reply.status(401).send({ message: EErrors.AUTH_ERR });
      }
    }
  };
}
