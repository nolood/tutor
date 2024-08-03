import { Service } from "../service.class";

import type { UserRepository } from "~/repositories/user/user.repository";
import type { EModule, Logger } from "~/types/types";
import jwt from "jsonwebtoken";
import { ERROR } from "~/constants/enums/error-enum";
import { env } from "~/env";
export class UserService extends Service {
  userRepository: UserRepository;
  constructor(log: Logger, userRepository: UserRepository, name: EModule) {
    super(log, name);

    this.userRepository = userRepository;
  }

  getAll = async () => {
    return this.userRepository.getAll();
  };
  getSelf = async (tokenHeader: string) => {
    try {
      const token = tokenHeader.split(" ")[1];
      const decoded = jwt.verify(token, env.SECRET_KEY || "ARCH_LINUX") as {
        id: string;
        email: string;
        name: string;
      };
      this.log.info(`${decoded.id} userId`);
      const user = await this.userRepository.findByEmail(decoded.email);

      if (!user) {
        throw new Error(ERROR.USER_NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new Error(`Ошибка из ${ERROR.TOKEN_AUTH}`);
    }
  };
}
