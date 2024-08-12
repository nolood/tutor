import { api } from "~/shared/api/api";
import { IRegisterFields } from "../types/auth-types";
import { IUserType } from "~/shared/types/user-type";
import { AxiosError } from "axios";


export const sendRegister = async (params: IRegisterFields): Promise<{
  user: IUserType;
  token: string;
}> => {
  try {
    const { data } = await api.post<{
      user: IUserType;
      token: string;
    }>("/auth/register", params);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(
        error.message,
        error.code,
        error.config,
        error.request,
        error.response
      );
    }
    throw error;
  }
};
