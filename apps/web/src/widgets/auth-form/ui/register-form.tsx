import React, { FormEvent } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formRegisterSchema } from "../model/form-register-schema";
import { Button } from "@nextui-org/button";
import { TextFieldForm } from "~/shared/ui/text-field-form";
import { z } from "zod";
import LinkVariantsForm from "./link-variants-form";

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
    <form
      className={"w-1/2 items-center flex flex-col gap-3"}
      onSubmit={onSubmit}
    >
      <h2 className="text-start text-2xl">Регистрация</h2>
      <TextFieldForm<z.infer<typeof formRegisterSchema>>
        Field={Field}
        className={"w-full"}
        isRequired
        name="email"
        color="default"
        label="Ник-нейм"
        placeholder="f1k..."
        size="lg"
      />
      <TextFieldForm<z.infer<typeof formRegisterSchema>>
        Field={Field}
        className={"w-full"}
        isRequired
        name="email"
        color="default"
        label="Почта"
        placeholder="@gmail.com"
        size="lg"
      />
      <TextFieldForm<z.infer<typeof formRegisterSchema>>
        Field={Field}
        className={"w-full"}
        name="password"
        isRequired
        type={"password"}
        color="default"
        label={"Пароль"}
        placeholder="*****"
        size="lg"
      />
      <TextFieldForm<z.infer<typeof formRegisterSchema>>
        Field={Field}
        type={"password"}
        className={"w-full"}
        name="repeatPassword"
        isRequired
        label={"Повторите пароль"}
        placeholder={"*****"}
        color="default"
        size="lg"
      />
      <Button
        className={"w-1/2 mt-2 py-2 text-[18px]"}
        type="submit"
        color="primary"
        variant="shadow"
        size={"lg"}
      >
        Отправить
      </Button>
      <LinkVariantsForm
        title={"Есть аккаунт?"}
        link={"/login"}
        text={"Войдите"}
      />
    </form>
  );
};

export default RegisterForm;
