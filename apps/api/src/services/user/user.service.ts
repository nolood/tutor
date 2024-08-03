import { Service } from "../service.class";

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
}
