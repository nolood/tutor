export interface IUser {
  id: string;
  name: string;
}
export interface IUserConfig {
  userId: string;
  email: string;
  password: string;
}

export interface IUserData {
  user: IUser;
  userConfig: IUserConfig;
}
