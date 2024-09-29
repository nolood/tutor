import { TokenApi, tokenApi } from "~/shared/local-storage/token/token";
import { Api } from "../api";
import { userSchema } from "./model/user-schema";
import { IUserData } from "./model/user-type";
import { authSchema } from "../auth/model/auth-schema";

interface IUserApi {
  getSelf: () => Promise<IUserData>;
}

export class UserApi extends Api implements IUserApi {
  private static instance: UserApi;
  tokenApi: TokenApi<string>;
  private constructor() {
    super();
    this.tokenApi = tokenApi(authSchema);
  }
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
  public logout(): void {
    this.tokenApi.removeToken();
  }
}
