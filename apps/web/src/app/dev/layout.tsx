import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { env } from "~/env";

const Layout = ({ children }: { children: ReactNode }) => {
  if (env.NODE_ENV !== "development") {
    return notFound();
  }

  return <div>{children}</div>;
};

export default Layout;
