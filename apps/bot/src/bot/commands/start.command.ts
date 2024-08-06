import { Markup, type Telegraf } from "telegraf";

import { ECallbacks } from "../constants/callbacks";
import { texts } from "../constants/texts";
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
        await ctx.reply(
          texts.start.text,
          Markup.inlineKeyboard([
            [Markup.button.url(texts.start.signin, ECallbacks.SIGNIN)],
            [Markup.button.url(texts.start.login, ECallbacks.LOGIN)],
          ]),
        );
        // ctx.scene.enter("test-scene");
      } catch (error: unknown) {
        ctx.log.error("StartCommand", error);
      }
    });
  };
}
