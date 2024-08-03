import { relations } from "drizzle-orm";
import { text, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

import { userTable } from "./user.schema";

export const userConfigTable = pgTable("userConfig", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  email: text("email").unique().notNull(),
  password: text("password"),
});

export const userConfigRelations = relations(userConfigTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userConfigTable.userId],
    references: [userTable.id],
    relationName: "user",
  }),
}));
