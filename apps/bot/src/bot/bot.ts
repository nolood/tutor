import logger from "@repo/logger";
import { Scenes, Telegraf, session } from "telegraf";

import { StartCommand } from "./commands/start.command";
import type { IBotContext } from "./context/context";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { AuthScene } from "./scenes/auth.scene";

export class Bot {
  protected bot: Telegraf<IBotContext>;
  log: typeof logger;

  constructor(private readonly token: string) {
    this.log = logger;
    this.bot = new Telegraf<IBotContext>(token);
    this.bot.use(session());
    this.bot.use(loggerMiddleware);

    const stage = new Scenes.Stage<IBotContext>([new AuthScene()]);

    this.bot.use(stage.middleware());
  }

  public init() {
    const commands = [new StartCommand(this.bot)];

    commands.forEach((command) => {
      command.handle();
    });

    void this.bot.launch();

    this.log.info("Bot started successfully");
  }

  public stop(reason: string) {
    this.bot.stop(reason);
  }
}
