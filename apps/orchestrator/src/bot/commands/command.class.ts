import { type Telegraf } from "telegraf";

import { type IBotContext } from "../context/context";

export abstract class Command {
  constructor(protected bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
