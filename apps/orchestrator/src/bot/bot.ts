import { Telegraf, session } from "telegraf";

import { StartCommand } from "./commands/start.command";
import type { IBotContext } from "./context/context";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { EBotButtonType, type BotDataType } from "./types/bot.types";

export class Bot {
  protected bot: Telegraf<IBotContext>;

  data: BotDataType = {
    callbacks: {
      math: {
        message: "В каком Вы классе/курсе?",
        keyboard: [
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "1-4 класс",
              action: "class_1",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "5-9 класс",
              action: "class_2",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "10-11 класс",
              action: "class_3",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "1-2 курс",
              action: "course_1",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "3-4 курс",
              action: "course_2",
            },
          ],
        ],
      },

      russian: {
        message: "В каком Вы классе/курсе?",
        keyboard: [
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "1-4 класс",
              action: "class_1",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "5-9 класс",
              action: "class_2",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "10-11 класс",
              action: "class_3",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "1-2 курс",
              action: "course_1",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "3-4 курс",
              action: "course_2",
            },
          ],
        ],
      },

      english: {
        message: "В каком Вы классе/курсе?",
        keyboard: [
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "1-4 класс",
              action: "class_1",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "5-9 класс",
              action: "class_2",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "10-11 класс",
              action: "class_3",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "1-2 курс",
              action: "course_1",
            },
          ],
          [
            {
              type: EBotButtonType.CALLBACK,
              text: "3-4 курс",
              action: "course_2",
            },
          ],
        ],
      },
    },
    start: {
      keyboard: [
        [{ type: EBotButtonType.CALLBACK, text: "Математика", action: "math" }],
        [
          {
            type: EBotButtonType.CALLBACK,
            text: "Русский язык",
            action: "russian",
          },
        ],
        [
          {
            type: EBotButtonType.CALLBACK,
            text: "Английский язык",
            action: "english",
          },
        ],
        [
          {
            type: EBotButtonType.URL,
            text: "Мой сайт",
            action: "https://github.com/",
          },
        ],
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
