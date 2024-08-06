import { z } from "zod";
import { EFormErrors } from "./auth-form-types";

const passwordSchema = z.string().min(6, { message: EFormErrors.REQUIRED });

export const formRegisterSchema = z
  .object({
    email: z.string().email({ message: EFormErrors.REQUIRED }),
    name: z.string().min(6, { message: EFormErrors.MINLENGTH }),
    password: passwordSchema,
    repeatPassword: passwordSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: EFormErrors.MISMATCH,
    path: ["repeatPassword"],
  });
