import { relations } from "drizzle-orm";
import { text, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { numeric } from "drizzle-orm/pg-core";
import { unique } from "drizzle-orm/pg-core";

import { userTable } from "./user.schema";

export const userConfigTable = pgTable(
  "userConfig",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => userTable.id),
    tgId: numeric("tg_id").unique(),
    tgUsername: text("tg_username").unique(),
    tgFirstName: text("tg_first_name"),
    tgLastName: text("tg_last_name"),
    tgLanguageCode: text("tg_language_code"),
    email: text("email").unique(),
    password: text("password"),
  },
  (t) => ({
    unq1: unique().on(t.tgId, t.tgUsername, t.tgFirstName),
  }),
);

export const userConfigRelations = relations(userConfigTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userConfigTable.userId],
    references: [userTable.id],
    relationName: "user",
  }),
}));
