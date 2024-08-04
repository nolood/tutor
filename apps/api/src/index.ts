import logger, { LoggerSettings } from "@repo/logger";
import type { FastifyInstance } from "fastify";
import { fastify } from "fastify";

import { env } from "./env";
import getHandlers from "./handlers";
import { AuthHandlers } from "./handlers/auth/auth.handler";
import { UserHandlers } from "./handlers/user/user.handler";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import getRepositories from "./repositories";
import { UserRepository } from "./repositories/user/user.repository";
import { AuthRoutes } from "./routes/auth/auth.route";
import { UserRoutes } from "./routes/user/user.route";
import getServices from "./services";
import { AuthService } from "./services/auth/auth.service";
import { UserService } from "./services/user/user.service";
import { EModule, type Logger } from "./types/types";

class Server {
  api: FastifyInstance;
  log: Logger;

  constructor() {
    this.api = fastify({
      logger: LoggerSettings,
    });

    this.log = logger;
  }

  init = async () => {
    const repositories = getRepositories(
      new UserRepository(this.log, EModule.USER),
    );

    const services = getServices(
      new UserService(
        this.log,
        repositories.user as UserRepository,
        EModule.USER,
      ),
      new AuthService(
        this.log,
        repositories.user as UserRepository,
        EModule.AUTH,
      ),
    );

    const handlers = getHandlers(
      new UserHandlers(this.log, services.user as UserService, EModule.USER),
      new AuthHandlers(this.log, services.auth as AuthService, EModule.AUTH),
    );

    const routes = [
      new UserRoutes(handlers.user as UserHandlers, "/users", EModule.USER, [
        new AuthMiddleware(),
      ]),
      new AuthRoutes(handlers.auth as AuthHandlers, "/auth", EModule.AUTH),
    ];

    for (const route of routes) {
      console.log(route.prefix);
      await this.api.register(route.register.bind(route), {
        prefix: route.prefix,
      });
    }
  };

  async start() {
    try {
      await this.init();

      await this.api.listen({ port: env.PORT });
    } catch (e) {
      this.log.error(`Unable to start server ${e}`);
    }
  }
}

const server = new Server();

server.start();
