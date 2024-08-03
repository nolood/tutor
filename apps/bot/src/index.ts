import { Bot } from "./bot/bot";
import { env } from "./env";

const bot = new Bot(env.TG_TOKEN);

bot.init();
