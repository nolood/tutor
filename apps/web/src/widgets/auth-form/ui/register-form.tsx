import { FormEvent } from "react";
import AuthForm from "./auth-form";
import { TextFieldForm } from "~/shared/ui";
import { formRegisterSchema } from "../model/form-register";
import { useFormData } from "../hooks/use-form";
const RegisterForm = () => {
  const registerForm = useFormData();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    registerForm.handleSubmit();
  };
  return (
    <AuthForm handleSubmit={handleSubmit}>
      <TextFieldForm
        form={registerForm}
        nameField={"Email"}
        validators={formRegisterSchema.email}
      />
    </AuthForm>
  );
};

export default RegisterForm;
