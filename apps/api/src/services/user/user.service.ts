import { Service } from "../service.class";

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
}
