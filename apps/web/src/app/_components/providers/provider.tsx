"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import SessionProvider from "./session/session-provider";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false}/>
        {children}
      </QueryClientProvider>
     </NextUIProvider>
    </SessionProvider>
  );
};    

export default Provider;
