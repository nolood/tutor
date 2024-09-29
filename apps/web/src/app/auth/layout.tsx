"use client";

import { ReactNode } from "react";
import AuthLayout from "./auth-layout";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
