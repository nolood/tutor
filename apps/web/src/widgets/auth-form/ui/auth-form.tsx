import React, { FC, FormEvent, ReactNode } from "react";

type AuthFormProps = {
  children: ReactNode;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit }) => {
  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default AuthForm;
