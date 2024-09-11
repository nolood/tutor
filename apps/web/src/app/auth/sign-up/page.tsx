"use client";

import RegisterForm from "~/widgets/auth-form/ui/register-form";
import Layout from "../layout";
import LinkVariantsForm from "~/widgets/auth-form/ui/link-variants-form";

const Register = () => {
  return (
    <Layout>
      <RegisterForm />
       <LinkVariantsForm
        title={"Есть аккаунт?"}
        link={"/sign-in"}
        text={"Войдите"}
      />
    </Layout>
  );
};

export default Register;
