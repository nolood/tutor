import { type Telegraf } from "telegraf";

import { type IBotContext } from "../context/context";

import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);

    this.bot.use();
  }

  handle = (): void => {
    this.bot.start(async (ctx) => {
      try {
        await ctx.reply("START");
      } catch (error: unknown) {
        ctx.log.error("StartCommand", error);
      }
    });
  };
}
