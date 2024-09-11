import { IUser } from "./../types/user-type";
import { useState } from "react";

export const useSession = () => {
  const [user, setUser] = useState<IUser>();

  const handleSetUser = (user: IUser) => {
    setUser(user);
  };
  return { user, handleSetUser };
};
