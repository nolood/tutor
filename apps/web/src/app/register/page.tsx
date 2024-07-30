"use client";

import RegisterForm from "~/widgets/auth-form/ui/register-form";
import { AuthLayout } from "../_components/layouts/auth-layout";

const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
