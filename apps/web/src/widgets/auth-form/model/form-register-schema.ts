import { z } from "zod";
import { FormErrors } from "../enums/form-enum";

const passwordSchema = z
  .string()
  .min(6, { message: FormErrors.PasswordMinLength });

export const formRegisterSchema = z
  .object({
    email: z.string().email({ message: FormErrors.EmailRequired }),
    password: passwordSchema,
    repeatPassword: passwordSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: FormErrors.PasswordMismatch,
    path: ["repeatPassword"],
  });
