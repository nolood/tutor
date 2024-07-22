import { Input, InputProps } from "@nextui-org/input";
import { FormApi } from "@tanstack/react-form";
import React from "react";

type TextFieldFormProps<T> = {
  name: string;
  validators: () => void;
  form: FormApi<T>;
} & InputProps;

const TextFieldForm = <T extends Record<string, unknown> & {Field: fc}>({
  form,
  name,
  validators,
  ...props
}: TextFieldFormProps<T>) => {
  return (
    <form.Field
      name={name}
      validate={validators}
      children={(field) => (
        <Input
          {...props}
          name={field.name}
          onChange={(e) => form.handleChange(e.target.value)}
        />
      )}
    />
  );
};

export default TextFieldForm;
