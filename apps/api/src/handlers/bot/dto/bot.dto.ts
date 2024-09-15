import z from "zod";

const ButtonSchema = z.object({
  callback: z.string(),
  text: z.string(),
});

const KeyboardRowSchema = z.array(ButtonSchema);
const KeyboardSchema = z.array(KeyboardRowSchema);

export const BotJSONSchema = z.object({
  callbacks: z.record(
    z.object({
      keyboard: KeyboardSchema.optional(),
      message: z.string(),
    })
  ),
  startKeyboard: KeyboardSchema,
  startMessage: z.string(),
});

export const createOrUpdateUserConfigDtoSchema = z.object({
  id: z.number(),
  username: z.string().optional(),
  first_name: z.string(),
  last_name: z.string().optional(),
  language_code: z.string(),
  schema: BotJSONSchema,
});

export type TCreateOrUpdateUserConfig = z.infer<
  typeof createOrUpdateUserConfigDtoSchema
>;
