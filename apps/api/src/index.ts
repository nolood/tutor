import logger, { LoggerSettings } from "@repo/logger";
import type { FastifyInstance } from "fastify";
import { fastify } from "fastify";

import { env } from "./env";
import getHandlers from "./handlers";
import { UserHandlers } from "./handlers/user/user.handler";
import getRepositories from "./repositories";
import { UserRepository } from "./repositories/user/user.repository";
import { UserRoutes } from "./routes/user/user.route";
import getServices from "./services";
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
    );

    const handlers = getHandlers(
      new UserHandlers(this.log, services.user as UserService, EModule.USER),
    );

    const routes = [
      new UserRoutes(handlers.user as UserHandlers, "/users", EModule.USER),
    ];

    for (const route of routes) {
      await this.api.register(route.register);
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
