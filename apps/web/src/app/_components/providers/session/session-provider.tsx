"use client";

import { useSession } from "~/shared/hooks/use-session";
import { SessionContext } from "./session-context";
import { ReactNode } from "react";

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const data = useSession();
  return (
    <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
