import type { UserRepository } from "./../../repositories/user/user.repository";
import { Service } from "../service.class";
import type { EModule, Logger } from "~/types/types";
import type { ICreateUserDto, IUserDto } from "~/handlers/user/dto/user.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AuthService extends Service {
  userRepository: UserRepository;

  constructor(log: Logger, userRepository: UserRepository, name: EModule) {
    super(log, name);
    this.userRepository = userRepository;
  }
  register = async (userData: ICreateUserDto) => {
    try {
      const { email, password, name } = userData;
      console.log(userData, "userdata");
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creating the user
      const user = await this.userRepository.create({
        email,
        password: hashedPassword,
        name,
      });

      // Generating JWT token
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET || "ARCH_LINUX",
        { expiresIn: "1h" }
      );

      return { token: jwtToken, user };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка регистрации пользователя ${error.message}`);
      } else {
        console.error("Unknown error in AuthService.register");
        throw new Error("Произошла неизвестная ошибка");
      }
    }
  };
}
