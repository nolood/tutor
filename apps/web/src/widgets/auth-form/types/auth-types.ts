export interface IRegisterFields {
  name: string;
  email: string;
  password: string;
}
export interface IDataRegister {
  user: {
    id: string;
    userId: string;
    email: string;
    password: string;
    name: string;
  };
  token: string;
}
