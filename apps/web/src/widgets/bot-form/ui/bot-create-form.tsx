"use client";

import { useForm } from "@tanstack/react-form";
import React, { FormEvent, useState } from "react";
import { DEFAULT_VALUES } from "../model/default-values";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
const BotCreateForm = () => {
  const [keyboard, setKeyboard] = useState(
    DEFAULT_VALUES.callbacks.key.keyboard
  );

  const { handleSubmit, Field, state, setFieldValue } = useForm({
    defaultValues: DEFAULT_VALUES,
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };
  const addButton = () => {
    const newKeyboard = [...keyboard, [{ callback: "", text: "" }]];
    setKeyboard(newKeyboard);
  };

  const removeButton = (rowIndex: number) => {
    const newKeyboard = keyboard.filter((_, index) => index !== rowIndex);

    setKeyboard(newKeyboard);
    setFieldValue("callbacks.key.keyboard", newKeyboard);
  };

  const handleInputChange = (
    rowIndex: number,
    field: keyof { callback: string; text: string },
    value: string
  ) => {
    const updatedKeyboard = [...keyboard];
    updatedKeyboard[rowIndex][0][field] = value;
    setKeyboard(updatedKeyboard);
    setFieldValue("callbacks.key.keyboard", updatedKeyboard);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Форма создания бота</h2>

      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div>
            <Input
              type="text"
              label="Callback:"
              value={row[0].callback}
              onChange={(e) =>
                handleInputChange(rowIndex, "callback", e.target.value)
              }
            />
          </div>
          <div>
            <Input
              label="Text:"
              type="text"
              value={row[0].text}
              onChange={(e) =>
                handleInputChange(rowIndex, "text", e.target.value)
              }
            />
          </div>
          <Button type="button" onClick={() => removeButton(rowIndex)}>
            Удалить кнопку
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addButton}>
        Добавить кнопку
      </Button>

      {/* <Field
        name="callbacks.key.message"
        render={({ field }) => <TextFieldForm {...field} label="Сообщение" />}
      /> */}

      <button type="submit">Создать бота</button>
    </form>
  );
};

export default BotCreateForm;
