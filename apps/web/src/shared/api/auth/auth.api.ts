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
import { tokenApi } from "~/shared/local-storage/token/token";
export interface IAuthApi {
  signIn(params: IRegisterFields): Promise<IDataRegister>;
  setToken(token: string): void;
}
export class AuthApi extends Api implements IAuthApi {
  private static instance: AuthApi;
  tokenApi: any;

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
      this.setToken(data.token);
      this.tokenApi.setToken(data.token);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
