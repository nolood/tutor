import { text, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { userTable } from "../user/user.schema";

export const userConfigTable = pgTable("userConfig", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id), // Внешний ключ
  email: text("email").unique().notNull(),
  password: text("password"),
});
