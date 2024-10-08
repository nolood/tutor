import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Service } from "../service.class";

import type { UserRepository } from "./../../repositories/user/user.repository";

import { EErrors } from "~/constants/enums/error-enum";
import { env } from "~/env";
import type { TLoginDto, TRegisterDto } from "~/handlers/auth/dto/auth.dto";
import type { Logger } from "~/types/types";

export class AuthService extends Service {
  userRepository: UserRepository;

  constructor(log: Logger, userRepository: UserRepository) {
    super(log);
    this.userRepository = userRepository;
  }

  register = async (userData: TRegisterDto) => {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    if (!user.email) {
      return;
    }

    const token = this.createToken(user.id, user.email, user.name);

    return { token, user };
  };

  login = async (userData: TLoginDto) => {
    const { email, password } = userData;

    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password || !user.email) {
      throw new Error(EErrors.AUTH_ERR);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error(EErrors.LOG_ERR_PASS);
    }

    const token = this.createToken(user.id, user.email, user.name);

    return { token, user };
  };

  createToken = (id: string, email: string, name: string) => {
    const token = jwt.sign({ id: id, email, name }, env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return token;
  };
}
