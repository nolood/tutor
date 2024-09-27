import { z } from "zod";

export const authSchema = z.string();

export const requestSchemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});
export const userSchema = z.object({
  name: z.string(),
  id: z.string(),
});
export const userConfigSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  userId: z.string(),
});
export const responseSchemaSignIn = z.object({
  user: userSchema,
  userConfig: userConfigSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});
