import { Service } from "../service.class";

import type { TCreateOrUpdateUserConfig } from "~/handlers/bot/dto/bot.dto";
import type { UserRepository } from "~/repositories/user/user.repository";
import type { Logger } from "~/types/types";

export class BotService extends Service {
  userRepository: UserRepository;

  constructor(log: Logger, userRepository: UserRepository) {
    super(log);

    this.userRepository = userRepository;
  }

  createOrUpdateUserConfig = async (dto: TCreateOrUpdateUserConfig) => {
    return this.userRepository.createOrUpdateUserConfig(dto);
  };
}
