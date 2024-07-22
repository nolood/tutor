import React, { FormEvent } from "react";
import AuthForm from "./auth-form";
import { useForm } from "@tanstack/react-form";
import { Input } from "@nextui-org/input";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formRegisterSchema } from "../model/form-register-schema";
import { Button } from "@nextui-org/button";

const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formRegisterSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <form.Field
        name="email"
        children={(field) => (
          <Input
            color="primary"
            size="lg"
            name={field.name}
            onChange={(e) => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors}
          />
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <Input
            color="primary"
            size="lg"
            name={field.name}
            onChange={(e) => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors}
          />
        )}
      />
      <form.Field
        name="repeatPassword"
        children={(field) => (
          <Input
            color="primary"
            size="lg"
            name={field.name}
            onChange={(e) => field.handleChange(e.target.value)}
            onError={() => console.log(field)}
            value={field.state.value}
          />
        )}
      />
      <Button type="submit" color="primary">
        Submit
      </Button>
    </AuthForm>
  );
};

export default RegisterForm;
