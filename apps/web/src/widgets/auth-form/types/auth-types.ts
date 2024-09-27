export interface IRegisterFields {
  name: string;
  email: string;
  password: string;
}
export interface IDataRegister {
  user: {
    id: string;
    name: string;
  };
  userConfig: {
    userId: string;
    email: string;
    password: string;
  };
  accessToken: string;
  refreshToken: string;
}
