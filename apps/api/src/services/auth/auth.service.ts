import type { UserRepository } from "./../../repositories/user/user.repository";
import { Service } from "../service.class";
import type { EModule, Logger } from "~/types/types";
import type {
  ICreateUserDto,
  ILoginUserDto,
} from "~/handlers/user/dto/user.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { ERROR } from "~/constants/enums/error-enum";

export class AuthService extends Service {
  userRepository: UserRepository;

  constructor(log: Logger, userRepository: UserRepository, name: EModule) {
    super(log, name);
    this.userRepository = userRepository;
  }

  register = async (userData: ICreateUserDto) => {
    try {
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
        { expiresIn: "1h" }
      );

      return { token: jwtToken, user };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка регистрации пользователя: ${error.message}`);
      }
    }
  };

  login = async (userData: ILoginUserDto) => {
    try {
      const { email, password } = userData;

      const user = await this.userRepository.findByEmail(email);

      if (!user || !user.password) {
        throw new Error(ERROR.LOG_ERR_NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error(ERROR.LOG_ERR_PASS);
      }

      const jwtToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET || "ARCH_LINUX",
        { expiresIn: "1h" }
      );

      return { token: jwtToken, user };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка аутентификации пользователя: ${error.message}`);
      }
    }
  };
}
