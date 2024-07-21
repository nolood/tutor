import { Telegraf, session } from "telegraf";

import type { IBotContext } from "./context/context";
import { loggerMiddleware } from "./middlewares/logger.middleware";

class Bot {
  bot: Telegraf<IBotContext>;

  constructor(private readonly token: string) {
    this.bot = new Telegraf<IBotContext>(token);
    this.bot.use(session());
    this.bot.use(loggerMiddleware);
  }

  init() {
    void this.bot.launch();
  }

  stop(reason: string) {
    this.bot.stop(reason);
  }
}

const bot = new Bot("");

bot.init();
console.log("telegram bot started");
