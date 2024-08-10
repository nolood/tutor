import z from "zod";

export const createOrUpdateUserConfigDtoSchema = z.object({
  id: z.number(),
  username: z.string().optional(),
  first_name: z.string(),
  last_name: z.string().optional(),
  language_code: z.string(),
});

export type TCreateOrUpdateUserConfig = z.infer<
  typeof createOrUpdateUserConfigDtoSchema
>;
