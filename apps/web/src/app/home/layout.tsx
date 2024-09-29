"use client";

import { ReactNode } from "react";
import AppLayout from "./app-layout";
import SessionProvider from "../_components/providers/session/session-provider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppLayout>
      <SessionProvider>{children}</SessionProvider>
    </AppLayout>
  );
};

export default Layout;
