import { Api } from "~/shared/api/api";
import { IDataRegister, IRegisterFields } from "~/widgets/auth-form/types/auth-types";
import { authSchema } from "./model/auth-schema";
import { tokenApi } from "~/shared/local-storage/token/token";

export class AuthApi extends Api {

  constructor() {
    super();
    this.tokenApi = tokenApi(authSchema)
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
