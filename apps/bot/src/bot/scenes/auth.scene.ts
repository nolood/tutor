import { EScenes } from "../constants/scenes";
import { texts } from "../constants/texts";

import { Scene } from "./scene.class";

import { AuthService } from "~/services/auth/auth.service";

export class AuthScene extends Scene {
  authService = new AuthService();

  constructor() {
    super(EScenes.AUTH);

    this.enter(async (ctx) => {
      const user = ctx.from;

      if (!user) {
        return;
      }

      const isAuth = this.authService.getIsAuth(user);

      if (isAuth) {
        ctx.reply(texts.auth.auth);
      }

      ctx.reply(texts.auth.notAuth);
    });
  }
}
