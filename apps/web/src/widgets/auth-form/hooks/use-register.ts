import { useRouter } from "next/navigation";
import { IRegisterFields } from "../types/auth-types";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "~/shared/api/auth/auth.api";

export const useRegister = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (params: IRegisterFields) => {
      return AuthApi.getInstance().signIn(params);
    },
    onSuccess: () => {
      toast.success("Успешная регистрация");
      router.push("/home");
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
