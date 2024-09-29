import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return <div className={"w-full h-[100vh]"}>{children}</div>;
};

export default AppLayout;
