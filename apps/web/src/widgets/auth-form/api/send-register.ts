import { IRegisterFields } from "../types/auth-types";
import axios, { AxiosError } from "axios";
import { IUser } from "~/shared/types/user-type";

export const sendRegister = async (
  params: IRegisterFields
): Promise<{
  user: IUser;
  token: string;
}> => {
  try {
    const { data } = await axios.post<{
      user: IUser;
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
