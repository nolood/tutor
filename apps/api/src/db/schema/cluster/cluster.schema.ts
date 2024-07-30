import { pgTable, uuid } from "drizzle-orm/pg-core";

export const clusterTable = pgTable("clusters", {
  id: uuid("id").defaultRandom().primaryKey(),
});
