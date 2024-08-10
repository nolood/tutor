import { Api } from "../api.class";

import type { TCreateOrUpdateUserConfig } from "./dto/user.dto";

export class UserApi extends Api {
  constructor() {
    super();
  }

  createOrUpdateUserConfig = async (userConfig: TCreateOrUpdateUserConfig) => {
    const config = await this.api.post<{ lol: "kek" }>("/user/config", {
      ...userConfig,
    });

    return config.data;
  };
}
