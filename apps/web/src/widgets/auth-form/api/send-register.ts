import { api } from "~/shared/api/api";
import { IRegisterFields } from "../types/auth-types";

export const sendRegister = async (params: IRegisterFields) => {
  const { data } = await api.post("/auth/register", {
    ...params,
  });
  return data;
};
