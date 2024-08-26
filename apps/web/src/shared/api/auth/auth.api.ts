import { Api } from "~/shared/api/api";
import { TokenApi } from "~/shared/local-storage/token/token";
import { IDataRegister, IRegisterFields } from "~/widgets/auth-form/types/auth-types";

export class AuthApi extends Api {
  private tokenApi: TokenApi;

  constructor() {
    super();
    this.tokenApi = new TokenApi();
  }

  public async signIn(params: IRegisterFields): Promise<IDataRegister> {
    try {
      const data = await this.post<IDataRegister>("auth/register", params);
      this.setToken(data.token);
      this.tokenApi.setToken(data.token);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
