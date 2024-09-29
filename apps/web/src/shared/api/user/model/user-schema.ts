import { z } from "zod";
import { userConfigSchema, userSchema } from "../../auth/model/auth-schema";

export const userDataSchema = z.object({
  user: userSchema,
  userConfig: userConfigSchema
});
