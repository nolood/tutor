import { Markup, type Telegraf } from "telegraf";

import { texts } from "../constants/texts";
import { type IBotContext } from "../context/context";

import { Command } from "./command.class";

import type { AuthService } from "~/services/auth/auth.service";

export class StartCommand extends Command {
  authService: AuthService;

  constructor(bot: Telegraf<IBotContext>, authService: AuthService) {
    super(bot);

    this.authService = authService;

    this.bot.use();
  }

  handle = (): void => {
    this.bot.start(async (ctx) => {
      try {
        await ctx.reply(
          texts.start.text,
          Markup.inlineKeyboard([
            [Markup.button.url(texts.start.signin, "signin url")],
            [Markup.button.url(texts.start.login, "login url")],
          ]),
        );
        // ctx.scene.enter("test-scene");
      } catch (error: unknown) {
        ctx.log.error("StartCommand", error);
      }
    });
  };

  getRegisterUrl = () => {};
}
