import { Api } from "~/shared/api/api";
import { TokenApi } from "~/shared/local-storage/token/token";
import {
  IDataRegister,
  IRegisterFields,
} from "~/widgets/auth-form/types/auth-types";

class AuthApi extends Api {
  private tokenApi: TokenApi;
  constructor() {
    super();
    this.tokenApi = new TokenApi();
  }
  public async signIn(params: IRegisterFields): Promise<IDataRegister> {
    try {
      const data = await this.send<IRegisterFields, IDataRegister>(
        "/auth/register",
        params,
        { method: "POST" }
      );
      this.setToken(data.token);
      this.tokenApi.setToken(data.token);
      return data;
    } catch (error) {
      console.log(error);
    }
    return undefined as never; // временное решение так как ошибка ts потом сделаю фикс;
  }
}
export const authApi = new AuthApi();
