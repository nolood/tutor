import { userTable, userTableRelations } from "./user.schema";
import { userConfigRelations, userConfigTable } from "./userConfig.schema";

export const userSchema = {
  user: userTable,
  userTableRelations,
  userConfig: userConfigTable,
  userConfigRelations,
};
