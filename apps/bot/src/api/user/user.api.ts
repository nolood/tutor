import type { User } from "telegraf/types";

import { Api } from "../api.class";

import type { TUserConfigCreate } from "./dto/user.dto";

export class UserApi extends Api {
  constructor() {
    super();
  }

  createOrUpdateUserConfig = async (userConfig: User) => {
    const config = await this.api.post<TUserConfigCreate>("/bot/config", {
      ...userConfig,
    });

    return config.data;
  };
}
