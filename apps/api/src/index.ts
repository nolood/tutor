import logger, { LoggerSettings } from "@repo/logger";
import type { FastifyInstance } from "fastify";
import { fastify } from "fastify";

import type { Logger } from "./types/types";
import type { ConfigData } from "./utils/config/config";
import { Config } from "./utils/config/config";

class Server {
  api: FastifyInstance;
  config: ConfigData;
  log: Logger;

  constructor() {
    this.api = fastify({
      logger: LoggerSettings,
    });

    this.log = logger;

    const config = new Config(logger);

    this.config = config.get();
  }

  init = () => {};

  async start() {
    try {
      await this.api.listen({ port: this.config.port });
    } catch (e) {
      this.log.error("Unable to start server", { error: e });
    }
  }
}

const server = new Server();

server.start();
