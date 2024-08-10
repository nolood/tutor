import { Markup, type Telegraf } from "telegraf";

import { ECallbacks } from "../constants/callbacks";
import { EScenes } from "../constants/scenes";
import { texts } from "../constants/texts";
import { type IBotContext } from "../context/context";

import { Command } from "./command.class";

import { AuthService } from "~/services/auth/auth.service";

export class StartCommand extends Command {
  authService = new AuthService();

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);

    this.bot.use();
  }

  handle = (): void => {
    this.bot.start(async (ctx) => {
      await ctx.reply(
        texts.start.text,
        Markup.inlineKeyboard([
          [
            Markup.button.callback(texts.start.buttons.auth, ECallbacks.AUTH),
            Markup.button.callback(texts.start.buttons.info, ECallbacks.AUTH),
          ],
        ]),
      );
    });

    this.bot.action(ECallbacks.AUTH, async (ctx) => {
      await ctx.scene.enter(EScenes.AUTH);
    });
  };

  getRegisterUrl = () => {};
}
