import React, { FormEvent } from "react";
import { useForm } from "@tanstack/react-form";
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
    <form className={"w-full flex flex-col  gap-3"} onSubmit={onSubmit}>
      <h2 className="text-center text-">Регистрация</h2>
      <TextFieldForm<z.infer<typeof formRegisterSchema>>
        Field={Field}
        className={"w-full"}
        name="email"
        variant={"bordered"}
        color="secondary"
        label="Почта"
        placeholder="@gmail.com"
        size="lg"
      />
      <TextFieldForm<z.infer<typeof formRegisterSchema>>
        Field={Field}
        className={"w-full"}
        name="password"
        type={"password"}
        variant={"bordered"}
        color="secondary"
        label={"Пароль"}
        placeholder="*****"
        size="lg"
      />
      <TextFieldForm<z.infer<typeof formRegisterSchema>>
        Field={Field}
        type={"password"}
        className={"w-full"}
        name="repeatPassword"
        variant={"bordered"}
        label={"Повторите пароль"}
        placeholder={"*****"}
        color="secondary"
        size="lg"
      />

      <Button className={"w-full mt-2"} type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
