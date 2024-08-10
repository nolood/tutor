import z from "zod";

export type TCreateOrUpdateUserConfig = {
  firstname: string;
  full_name: string;
  id: string;
  language_code: string;
  username: string;
};

export const userConfigCreateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional().nullable(),
  tgFirstName: z.string(),
  language_code: z.string(),
  tgUsername: z.string().optional(),
});

export type TUserConfigCreate = z.infer<typeof userConfigCreateSchema>;
