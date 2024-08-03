import jwt from "jsonwebtoken";

import { Service } from "../service.class";

import { EErrors } from "~/constants/enums/error-enum";
import { env } from "~/env";
import type { UserRepository } from "~/repositories/user/user.repository";
import type { EModule, Logger } from "~/types/types";
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
    const token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.SECRET_KEY || "ARCH_LINUX") as {
      email: string;
      id: string;
      name: string;
    };
    this.log.info(`${decoded.id} userId`);
    const user = await this.userRepository.findByEmail(decoded.email);

    if (!user) {
      throw new Error(EErrors.USER_NOT_FOUND);
    }

    return user;
  };
}
