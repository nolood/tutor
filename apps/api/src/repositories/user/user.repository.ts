import type { ICreateUserDto, IUserDto } from "~/handlers/user/dto/user.dto";
import { Repository } from "../repository.class";
import { userTable } from "~/db/schema/user/user.schema";
import { userConfigTable } from "~/db/schema/user-config/userConfig.schema";
import { eq } from "drizzle-orm";
import { ERROR } from "~/constants/enums/error-enum";

export class UserRepository extends Repository {
  getAll = async () => {
    const users = await this.db.select().from(userTable);
    return users;
  };
  create = async ({ email, password, name }: ICreateUserDto) => {
    try {
      const existingUser = await this.db.query.userConfig.findFirst({
        where: eq(userConfigTable.email, email),
      });
      if (existingUser) {
        throw new Error(ERROR.REG_ERR);
      }

      const [user] = await this.db
        .insert(userTable)
        .values({ name })
        .returning();

      if (!user || !user.id) {
        throw new Error("Ошибка создания пользователя в таблице user");
      }

      const [userConfig] = await this.db
        .insert(userConfigTable)
        .values({
          userId: user.id,
          email,
          password,
        })
        .returning();

      if (!userConfig) {
        throw new Error("Ошибка создания конфигурации пользователя");
      }

      return { ...user, ...userConfig };
    } catch (error) {
      throw error;
    }
  };

  findByEmail = async (email: string) => {
    try {
      const userConfig = await this.db.query.userConfig.findFirst({
        where: eq(userConfigTable.email, email),
      });

      if (!userConfig) {
        return null;
      }

      const user = await this.db.query.user.findFirst({
        where: eq(userTable.id, userConfig.userId),
      });

      return { ...user, ...userConfig };
    } catch (error) {
      throw error;
    }
  };
}
