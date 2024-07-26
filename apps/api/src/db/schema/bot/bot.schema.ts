import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { clusterTable } from "../cluster/cluster.schema";
import { userTable } from "../user/user.schema";

export const botTable = pgTable("bots", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => userTable.id),
  clusterId: uuid("cluster_id").references(() => clusterTable.id),
});

export const botTableRelations = relations(botTable, ({ one }) => ({
  cluster: one(clusterTable, {
    fields: [botTable.clusterId],
    references: [clusterTable.id],
    relationName: "cluster",
  }),
  user: one(userTable, {
    fields: [botTable.userId],
    references: [userTable.id],
    relationName: "user",
  }),
}));
