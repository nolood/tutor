'use client'

import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"w-full h-[100vh] flex items-center justify-center p-5"}>
      {children}
    </div>
  );
};

export default AuthLayout;
