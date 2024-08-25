import type { FastifyInstance } from "fastify";

import { Route } from "../route.class";

import type { BotHandlers } from "~/handlers/bot/bot.handlers";

export class BotRoutes extends Route<BotHandlers> {
  public defineRoutes = (fastify: FastifyInstance) => {
    fastify.post("/config", this.handlers.createOrUpdateUserConfig);
  };
}
