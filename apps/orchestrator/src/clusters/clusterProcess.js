import { Bot } from "~/bot/bot";

const bots = [];

process.on("message", (msg) => {
  console.log("Received message", msg);

  if (msg.type === "BOT_ADD") {
    console.log("Bot add");

    const botToken = msg.token;
    const bot = new Bot(botToken);

    bot.init();
    bots.push(bot);

    process.send({ type: "BOT_ADDED" });
  }
});
