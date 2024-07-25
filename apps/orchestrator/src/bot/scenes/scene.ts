import { Markup, Scenes } from "telegraf";

import type { IBotContext } from "../context/context";
import type { BotDataType } from "../types/bot.types";

export class Scene extends Scenes.BaseScene<IBotContext> {
  data: string[] = [];

  constructor(scene: string, callbacks: BotDataType["callbacks"]) {
    super(scene);

    Object.keys(callbacks).forEach((key) => {
      this.action(key, (ctx) => {
        if (callbacks[key].end) {
          ctx.reply("Конец вот что ты выбрал lox - " + [...this.data, key]);
          ctx.scene.leave();
        }

        ctx.reply(
          callbacks[key].message,
          Markup.inlineKeyboard(
            callbacks[key].keyboard.map((item) =>
              item.map((button) =>
                Markup.button[button.type](button.text, button.action),
              ),
            ),
          ),
        );

        this.data.push(key);
      });
    });
  }
}
