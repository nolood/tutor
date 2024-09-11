import { useRouter } from "next/navigation";
import { IRegisterFields } from "../types/auth-types";
import toast from "react-hot-toast";
import { useSessionContext } from "~/app/_components/providers/session/session-context";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "~/shared/api/auth/auth.api";
import { IUser } from "~/shared/types/user-type";

export const useRegister = () => {
  const router = useRouter();
  const { handleSetUser } = useSessionContext();

  const mutation = useMutation({
    mutationFn: (params: IRegisterFields) => {
      return AuthApi.getInstance().signIn(params);
    },
    onSuccess: (data: { user: IUser }) => {
      toast.success("Успешная регистрация");
      handleSetUser(data.user);
      router.push("/");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const handleSend = (params: IRegisterFields) => {
    mutation.mutate(params);
  };

  return { handleSend };
};
