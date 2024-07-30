import { botSchema } from "./bot/botSchema";
import { clusterSchema } from "./cluster/clusterSchema";
import { userSchema } from "./user/userSchema";

export const schema = {
  ...userSchema,
  ...botSchema,
  ...clusterSchema,
};
