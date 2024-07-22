import React, { FormEvent } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@nextui-org/input";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formRegisterSchema } from "../model/form-register-schema";
import { Button } from "@nextui-org/button";
import { TextFieldForm } from "~/shared/ui/text-field-form";
import { z } from "zod";

const RegisterForm = () => {
  const { handleSubmit, Field } = useForm({
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextFieldForm<z.infer<typeof formRegisterSchema>> Field={Field} name="email" color="primary"
        size="lg" />
      <Field
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
      <Field
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
    </form>
  );
};

export default RegisterForm;
