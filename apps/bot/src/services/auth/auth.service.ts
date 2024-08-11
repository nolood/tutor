import type { User } from "telegraf/types";

import { Service } from "../service.class";

import { UserApi } from "~/api/user/user.api";

export class AuthService extends Service {
  userApi: UserApi = new UserApi();

  getUserConfig = async (user: User) => {
    const data = await this.userApi.createOrUpdateUserConfig(user);

    return data;
  };
}
