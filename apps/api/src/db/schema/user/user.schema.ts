import { relations } from "drizzle-orm";
import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

import { userConfigTable } from "./userConfig.schema";

export const userTable = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").unique().notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const userTableRelations = relations(userTable, ({ one }) => ({
  config: one(userConfigTable, {
    fields: [userTable.id],
    references: [userConfigTable.userId],
    relationName: "config",
  }),
}));
