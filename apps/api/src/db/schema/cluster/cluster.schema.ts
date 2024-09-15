import { json } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { BotJSON } from "../bot/bot.type";

export const clusterTable = pgTable("clusters", {
  id: uuid("id").defaultRandom().primaryKey(),
  schema: json("schema").$type<BotJSON>(),
});
