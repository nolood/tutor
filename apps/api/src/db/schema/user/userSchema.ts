import { userTable, userTableRelations } from "./user.schema.js";
import { userConfigRelations, userConfigTable } from "./userConfig.schema.js";

export const userSchema = {
  user: userTable,
  userTableRelations,
  userConfig: userConfigTable,
  userConfigRelations,
};
