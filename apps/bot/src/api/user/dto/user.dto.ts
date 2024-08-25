import z from "zod";

export const userConfigCreateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional().nullable(),
  tgId: z.string(),
  tgUsername: z.string().optional(),
});

export type TUserConfigCreate = z.infer<typeof userConfigCreateSchema>;
