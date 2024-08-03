// TODO: FIX

export interface ICreateUserDto {
  email: string;
  name: string;
  password: string;
}

export interface IUserDto {
  email: string;
  id: number;
  name: string;
  password: string;
}
export interface ILoginUserDto {
  email: string;
  password: string;
}
