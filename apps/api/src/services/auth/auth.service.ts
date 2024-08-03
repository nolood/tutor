import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Service } from "../service.class";

import type { UserRepository } from "./../../repositories/user/user.repository";

import { EErrors } from "~/constants/enums/error-enum";
import { env } from "~/env";
import type {
  ICreateUserDto,
  ILoginUserDto,
} from "~/handlers/user/dto/user.dto";
import type { EModule, Logger } from "~/types/types";

export class AuthService extends Service {
  userRepository: UserRepository;

  constructor(log: Logger, userRepository: UserRepository, name: EModule) {
    super(log, name);
    this.userRepository = userRepository;
  }

  register = async (userData: ICreateUserDto) => {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      env.SECRET_KEY || "ARCH_LINUX",
      { expiresIn: "1h" },
    );

    return { token: jwtToken, user };
  };

  login = async (userData: ILoginUserDto) => {
    const { email, password } = userData;

    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new Error(EErrors.AUTH_ERR);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error(EErrors.LOG_ERR_PASS);
    }

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || "ARCH_LINUX",
      { expiresIn: "1h" },
    );

    return { token: jwtToken, user };
  };
}
