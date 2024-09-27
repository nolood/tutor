import { Api } from "../api";
import { userSchema } from "./model/user-schema";
import { IUserData } from "./model/user-type";

interface IUserApi {
  getSelf: () => Promise<IUserData>;
}

export class UserApi extends Api implements IUserApi {
  private static instance: UserApi;
  public static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }
    return UserApi.instance;
  }
  public async getSelf(): Promise<IUserData> {
    try {
      const data = await this.get<IUserData>("users/self", userSchema);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
