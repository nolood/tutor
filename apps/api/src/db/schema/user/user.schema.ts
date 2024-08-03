import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").unique().notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  email: text("email").unique().notNull(),
  password: text("password"),
});
