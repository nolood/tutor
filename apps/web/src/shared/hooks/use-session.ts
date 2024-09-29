import { useQuery } from "@tanstack/react-query";
import { IUser } from "./../types/user-type";
import { useEffect, useState } from "react";
import { UserApi } from "../api/user/user.api";
import { useRouter } from "next/navigation";
import { IUserData } from "../api/user/model/user-type";

export const useSession = () => {
  const [user, setUser] = useState<IUserData>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();
  const handleSetUser = (user: IUserData) => {
    setUser(user);
    setIsAuth(true);
  };
  const { data, isLoading, isError } = useQuery({
    queryFn: () => UserApi.getInstance().getSelf(),
    queryKey: ["user"],
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      handleSetUser(data);
    }
    if (isError) {
      setIsAuth(false);
      // UserApi.getInstance().logout();
      console.log(123);

      router.push("/auth/sign-in");
    }
  }, [data, isError]);

  return { user, handleSetUser, isAuth, isLoading };
};
