"use client";

import { useForm } from "@tanstack/react-form";
import React from "react";
import { DEFAULT_VALUES } from "../model/default-values";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { botCreateSchema } from "../model/bot-create-schema";

const BotCreateForm = () => {
  const { handleSubmit, Field, state } = useForm({
    defaultValues: DEFAULT_VALUES,
    validatorAdapter: zodValidator(),
    validators: {
      onChange: botCreateSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form>
      <h2>Форма создания бота </h2>
    </form>
  );
};

export default BotCreateForm;
