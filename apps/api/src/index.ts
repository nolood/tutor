import logger, { LoggerSettings } from "@repo/logger";
import type { FastifyInstance } from "fastify";
import { fastify } from "fastify";

import { env } from "./env";
import { UserHandlers } from "./handlers/user/user.handler";
import { UserRepository } from "./repositories/user/user.repository";
import { UserRoutes } from "./routes/user/user.route";
import { UserService } from "./services/user/user.service";
import type { Logger } from "./types/types";

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
    // TODO: Возможно при масштабировании придётся вынести в отдельный файл/модуль
    const repositories = {
      user: new UserRepository(this.log),
    };

    const services = {
      user: new UserService(this.log, repositories.user),
    };

    const handlers = {
      user: new UserHandlers(this.log, services.user),
    };

    const routes = {
      user: new UserRoutes(handlers.user, "/users"),
    };

    for (const route of Object.values(routes)) {
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
