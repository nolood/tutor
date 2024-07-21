import { FormApi, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formRegisterSchema } from "../model/form-register";
import { z } from "zod";
type FormValues = z.infer<typeof formRegisterSchema>;
export const useFormData = (): FormApi<FormValues> => {
  const registerForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
    },
    validatorAdapter: zodValidator(formRegisterSchema),
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return registerForm;
};
export default useFormData;
