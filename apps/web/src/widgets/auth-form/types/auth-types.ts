import { IUser } from "~/shared/types/user-type";

export interface IRegisterFields {
  name: string;
  email: string;
  password: string;
}
export interface IDataRegister {
  user: IUser;
  token: string;
}
