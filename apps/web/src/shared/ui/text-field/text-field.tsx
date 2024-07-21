import { Input, InputProps } from "@nextui-org/input";

type textFieldProps = InputProps;

const TextField = ({ ...props }: textFieldProps) => {
  return <Input {...props} />;
};

export default TextField;
