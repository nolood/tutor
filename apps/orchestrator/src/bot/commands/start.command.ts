import { Markup, type Telegraf } from "telegraf";

import { type IBotContext } from "../context/context";
import type { BotDataType } from "../types/bot.types";

import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(
    bot: Telegraf<IBotContext>,
    private data: BotDataType["start"],
  ) {
    super(bot);

    this.bot.use();
  }

  handle = (): void => {
    this.bot.start(async (ctx) => {
      try {
        await ctx.reply(
          this.data.message,
          Markup.inlineKeyboard(
            this.data.keyboard.map((item) =>
              item.map((button) =>
                Markup.button[button.type](button.text, button.action),
              ),
            ),
          ),
        );

        ctx.scene.enter("test-scene");
      } catch (error: unknown) {
        ctx.log.error("StartCommand", error);
      }
    });
  };
}
