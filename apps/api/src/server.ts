import cors from "@fastify/cors";
import logger, { LoggerSettings } from "@repo/logger";
import type { FastifyInstance } from "fastify";
import { fastify } from "fastify";

import { env } from "./env";
import { AuthHandlers } from "./handlers/auth/auth.handler";
import { BotHandlers } from "./handlers/bot/bot.handlers";
import { UserHandlers } from "./handlers/user/user.handler";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { UserRepository } from "./repositories/user/user.repository";
import { AuthRoutes } from "./routes/auth/auth.route";
import { BotRoutes } from "./routes/bot/bot.route";
import { UserRoutes } from "./routes/user/user.route";
import { AuthService } from "./services/auth/auth.service";
import { BotService } from "./services/bot/bot.service";
import { UserService } from "./services/user/user.service";
import { EModule, type Logger } from "./types/types";

export class Server {
  private api: FastifyInstance;
  private isTest = false;
  protected log: Logger;

  constructor(isTest = false) {
    this.api = fastify({
      logger: LoggerSettings,
    });

    this.api.register(cors);

    this.log = logger;

    this.isTest = isTest;
  }

  init = async () => {
    const repositories = {
      [EModule.USER]: new UserRepository(this.log, EModule.USER),
    };

    const services = {
      [EModule.USER]: new UserService(this.log, repositories[EModule.USER]),
      [EModule.AUTH]: new AuthService(this.log, repositories[EModule.USER]),
      [EModule.BOT]: new BotService(this.log, repositories[EModule.USER]),
    };

    const handlers = {
      [EModule.USER]: new UserHandlers(this.log, services[EModule.USER]),
      [EModule.AUTH]: new AuthHandlers(this.log, services[EModule.AUTH]),
      [EModule.BOT]: new BotHandlers(this.log, services[EModule.BOT]),
    };

    const routes = [
      new UserRoutes(handlers[EModule.USER], EModule.USER, [
        new AuthMiddleware(this.isTest),
      ]),
      new AuthRoutes(handlers[EModule.AUTH], EModule.AUTH),
      new BotRoutes(handlers[EModule.BOT], EModule.BOT),
    ];

    for (const route of routes) {
      await this.api.register(route.register.bind(route), {
        prefix: route.prefix,
      });
    }
  };

  async start() {
    try {
      await this.init();

      await this.api.listen({ port: env.PORT });

      return this.api;
    } catch (e) {
      this.log.error(`Unable to start server ${e}`);
      return this.api;
    }
  }

  async stop() {
    await this.api.close();
  }
}
