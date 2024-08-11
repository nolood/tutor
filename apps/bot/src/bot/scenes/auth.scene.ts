import { Markup } from "telegraf";

import { EScenes } from "../constants/scenes";
import { texts } from "../constants/texts";

import { Scene } from "./scene.class";

import { env } from "~/env";
import { AuthService } from "~/services/auth/auth.service";

export class AuthScene extends Scene {
  authService = new AuthService();

  constructor() {
    super(EScenes.AUTH);

    this.enter(async (ctx) => {
      try {
        const user = ctx.from;

        if (!user) {
          return;
        }

        const userConfig = await this.authService.getUserConfig(user);

        if (userConfig.userId) {
          const url =
            env.FRONT_URL +
            `/platform-auth?platform=telegram&token=${userConfig.id}`;

          ctx.reply(
            texts.auth.auth,
            Markup.inlineKeyboard([Markup.button.url("Войти", url)]),
          );

          return;
        }

        const url = env.FRONT_URL + `/auth?token=${user.id}`;

        ctx.reply(
          texts.auth.notAuth,
          Markup.inlineKeyboard([Markup.button.url("Регистрация", url)]),
        );
      } catch (e) {
        ctx.log.info(e);
        ctx.scene.leave();
      }
    });
  }
}
