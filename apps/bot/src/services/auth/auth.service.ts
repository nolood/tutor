import type { User } from "telegraf/types";

import { Service } from "../service.class";

import { UserApi } from "~/api/user/user.api";

export class AuthService extends Service {
  userApi: UserApi = new UserApi();

  getIsAuth = (user: User): boolean => {
    const data = this.userApi.createOrUpdateUserConfig(user);

    return !!data;
  };
}
