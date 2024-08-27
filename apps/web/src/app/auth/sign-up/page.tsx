"use client";

import RegisterForm from "~/widgets/auth-form/ui/register-form";
import LinkVariantsForm from "~/widgets/auth-form/ui/link-variants-form";

const Register = () => {
  return (
    <>
      <RegisterForm />
       <LinkVariantsForm
        title={"Есть аккаунт?"}
        link={"/sign-in"}
        text={"Войдите"}
      />
    </>
  );
};

export default Register;
