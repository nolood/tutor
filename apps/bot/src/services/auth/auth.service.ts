import type { User } from "telegraf/types";

import { Service } from "../service.class";

export class AuthService extends Service {
  private createUserConfig = () => {};

  getIsAuth = (user: User): boolean => {
    console.log(user, "user");

    return true;
  };
}
