import z from "zod";

export const registerDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

export type TRegisterDto = z.infer<typeof registerDtoSchema>;

export const loginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TLoginDto = z.infer<typeof loginDtoSchema>;
