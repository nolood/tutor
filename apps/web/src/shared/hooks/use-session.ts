import { userSchema } from "../api/auth/model/auth-schema";
import { tokenApi } from "../local-storage/token/token";
import { IUser } from "./../types/user-type";
import { useState } from "react";

export const useSession = () => {
  const [user, setUser] = useState<IUser>();
  const token = tokenApi(userSchema).getToken();
  const [isAuth, setIsAuth] = useState(token ? true : false );
  const handleSetUser = (user: IUser) => {
    setUser(user);
  };

  return { user, handleSetUser, isAuth };
};
