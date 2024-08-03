import { botSchema } from "./bot/botSchema";
import { clusterSchema } from "./cluster/clusterSchema";
import { userConfigSchema } from "./user-config/userConfigSchema";
import { userSchema } from "./user/userSchema";

export const schema = {
  ...userSchema,
  ...botSchema,
  ...clusterSchema,
  ...userConfigSchema,
};
