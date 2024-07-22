import { Telegraf, session } from "telegraf";

import { StartCommand } from "./commands/start.command";
import type { IBotContext } from "./context/context";
import { loggerMiddleware } from "./middlewares/logger.middleware";

export class Bot {
  protected bot: Telegraf<IBotContext>;

  data = {
    callbacks: {
      math: {
        message: "В каком Вы классе/курсе?",
        keyboard: [
          [{ type: "callback", text: "1-4 класс", callback: "class_1" }],
          [{ type: "callback", text: "5-9 класс", callback: "class_2" }],
          [{ type: "callback", text: "10-11 класс", callback: "class_3" }],
          [{ type: "callback", text: "1-2 курс", callback: "course_1" }],
          [{ type: "callback", text: "3-4 курс", callback: "course_2" }],
        ],
      },

      russian: {
        message: "В каком Вы классе/курсе?",
        keyboard: [
          [{ type: "callback", text: "1-4 класс", callback: "class_1" }],
          [{ type: "callback", text: "5-9 класс", callback: "class_2" }],
          [{ type: "callback", text: "10-11 класс", callback: "class_3" }],
          [{ type: "callback", text: "1-2 курс", callback: "course_1" }],
          [{ type: "callback", text: "3-4 курс", callback: "course_2" }],
        ],
      },

      english: {
        message: "В каком Вы классе/курсе?",
        keyboard: [
          [{ type: "callback", text: "1-4 класс", callback: "class_1" }],
          [{ type: "callback", text: "5-9 класс", callback: "class_2" }],
          [{ type: "callback", text: "10-11 класс", callback: "class_3" }],
          [{ type: "callback", text: "1-2 курс", callback: "course_1" }],
          [{ type: "callback", text: "3-4 курс", callback: "course_2" }],
        ],
      },
    },
    start: {
      keyboard: [
        [{ type: "callback", text: "Математика", callback: "math" }],
        [{ type: "callback", text: "Русский язык", callback: "russian" }],
        [{ type: "callback", text: "Английский язык", callback: "english" }],
        [{ type: "link", text: "Мой сайт", link: "https://github.com/" }],
      ],
      message:
        "Здравствуйте! Меня зовут Мария, заполните начальную информацию о себе, далее я с Вами свяжусь и мы сможем обсудить сотрудничество",
    },
  };

  constructor(private readonly token: string) {
    this.bot = new Telegraf<IBotContext>(token);
    this.bot.use(session());
    this.bot.use(loggerMiddleware);
  }

  public init() {
    const commands = [new StartCommand(this.bot, this.data.start)];

    commands.forEach((command) => {
      command.handle();
    });

    void this.bot.launch();
  }

  public stop(reason: string) {
    this.bot.stop(reason);
  }
}
