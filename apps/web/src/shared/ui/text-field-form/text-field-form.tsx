import { InputProps } from "@nextui-org/input";
import TextField from "../text-field/text-field";
import { FC } from "react";
type textFieldFormProps<T> = {
  nameField: string;
  validators: () => void;
  form: T;
} & InputProps;

const TextFieldForm: FC<textFieldFormProps<any>> = ({
  form,
  nameField,
  validators,
  ...props
}) => {
  return (
    <form.Field
      name={nameField}
      validators={validators}
      children={(field) => <TextField {...props} {...field} />}
    />
  );
};

export default TextFieldForm;
