import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Пароль должен быть минимум 6 символов");

export const formRegisterSchema = z
  .object({
    email: z.string().email("Поле email обязательно для регистрации"),
    username: z
      .string()
      .min(3, "Поле username должно быть минимум 3 символа длиной")
      .max(12, "Поле username не может быть длиннее 12 символов"),
    password: passwordSchema,
    repeatPassword: passwordSchema,
    firstName: z.string().min(1, "Поле имя не может быть пустым"),
    lastName: z.string().min(1, "Поле фамилия не может быть пустым"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });
