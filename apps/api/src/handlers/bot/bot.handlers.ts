import type { FastifyReply } from "fastify";

import { Handler } from "../handler.class";

import type { TCreateOrUpdateUserConfig } from "./dto/bot.dto";
import { createOrUpdateUserConfigDtoSchema } from "./dto/bot.dto";

import type { BotService } from "~/services/bot/bot.service";
import type { IAuthenticatedRequest, Logger } from "~/types/types";

export class BotHandlers extends Handler {
  botService: BotService;

  constructor(log: Logger, botService: BotService) {
    super(log);

    this.botService = botService;
  }

  createOrUpdateUserConfig = async (
    req: IAuthenticatedRequest,
    reply: FastifyReply
  ) => {
    const body = this.validate<TCreateOrUpdateUserConfig>(
      createOrUpdateUserConfigDtoSchema,
      req.body
    );
    const userId = this.getUserId(req);
    const data = await this.botService.createOrUpdateUserConfig(body, userId);

    reply.status(200).send(data);
  };
  getUpdateBot = async (req: IAuthenticatedRequest, reply: FastifyReply) => {
    const userId = this.getUserId(req);
    const bot = await this.botService.getUpdatedBot(userId);
    reply.status(200).send(bot);
  };
}
