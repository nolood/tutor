import { Telegraf, session } from "telegraf";

import { StartCommand } from "./commands/start.command";
import type { IBotContext } from "./context/context";
import { loggerMiddleware } from "./middlewares/logger.middleware";

export class Bot {
  protected bot: Telegraf<IBotContext>;

  constructor(private readonly token: string) {
    this.bot = new Telegraf<IBotContext>(token);
    this.bot.use(session());
    this.bot.use(loggerMiddleware);
  }

  public init() {
    const commands = [new StartCommand(this.bot)];

    commands.forEach((command) => {
      command.handle();
    });

    void this.bot.launch();
  }

  public stop(reason: string) {
    this.bot.stop(reason);
  }
}
