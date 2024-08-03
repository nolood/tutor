export interface ICreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface IUserDto {
  id: number;
  email: string;
  name: string;
  password: string;
}
