import { Input, InputProps } from "@nextui-org/input";
import {
  DeepKeys,
  FieldComponent,
  Updater,
  Validator,
} from "@tanstack/react-form";
import React from "react";

type TextFieldFormProps<T extends Record<string, unknown>> = {
  name: DeepKeys<T>;
  Field: FieldComponent<T, Validator<T>>;
} & InputProps;

const TextFieldForm = <T extends Record<string, unknown>>({
  name,
  Field,
  ...props
}: TextFieldFormProps<T>) => {
  return (
    <Field
      name={name}
      children={(field) => (
        <Input
          {...props}
          name={field.name}
          onChange={(e) =>
            field.handleChange(e.target.value as Updater<T, any>)
          }
        />
      )}
    />
  );
};

export default TextFieldForm;
