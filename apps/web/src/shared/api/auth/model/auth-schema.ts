import { z } from "zod";

export const authSchema = z.string();

export const requestSchemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  id: z.string(),
  userId: z.string(),
});
export const responseSchemaSignIn = z.object({
  user: userSchema,
  token: z.string(),
});
