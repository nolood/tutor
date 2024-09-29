import { Api } from "~/shared/api/api";
import {
  IDataRegister,
  IRegisterFields,
} from "~/widgets/auth-form/types/auth-types";
import {
  authSchema,
  requestSchemaSignIn,
  responseSchemaSignIn,
} from "./model/auth-schema";
import { TokenApi, tokenApi } from "~/shared/local-storage/token/token";
export interface IAuthApi {
  signIn(params: IRegisterFields): Promise<IDataRegister>;
}
export class AuthApi extends Api implements IAuthApi {
  private static instance: AuthApi;
  tokenApi: TokenApi<string>;
  private constructor() {
    super();
    this.tokenApi = tokenApi(authSchema);
  }

  public static getInstance(): AuthApi {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi();
    }
    return AuthApi.instance;
  }

  public async signIn(params: IRegisterFields): Promise<IDataRegister> {
    try {
      const data = await this.post<IDataRegister, IRegisterFields>(
        "auth/register",
        params,
        requestSchemaSignIn,
        responseSchemaSignIn
      );
      this.tokenApi.setToken(data.accessToken, data.refreshToken);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
