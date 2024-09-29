import { Service } from "../service.class";

import { EErrors } from "~/constants/enums/error-enum";
import type { UserRepository } from "~/repositories/user/user.repository";
import type { Logger } from "~/types/types";
export class UserService extends Service {
  userRepository: UserRepository;
  constructor(log: Logger, userRepository: UserRepository) {
    super(log);

    this.userRepository = userRepository;
  }

  getAll = async () => {
    return this.userRepository.getAll();
  };
  getSelf = async (id: string) => {
    const user = await this.userRepository.findById(id);
    const userConfig = await this.userRepository.findUserConfig(id);
    if (!user) {
      throw new Error(EErrors.USER_NOT_FOUND);
    }

    return { user, userConfig };
  };
}
