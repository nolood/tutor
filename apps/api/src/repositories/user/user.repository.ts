import { eq } from "drizzle-orm";

import { Repository } from "../repository.class";

import { EErrors } from "~/constants/enums/error-enum";
import { userTable } from "~/db/schema/user/user.schema";
import { userConfigTable } from "~/db/schema/user/userConfig.schema";
import type { ICreateUserDto } from "~/handlers/user/dto/user.dto";

// TODO: fix

export class UserRepository extends Repository {
  getAll = async () => {
    const users = await this.db.select().from(userTable);
    return users;
  };

  create = async ({ email, password, name }: ICreateUserDto) => {
    const existingUser = await this.db.query.userConfig.findFirst({
      where: eq(userConfigTable.email, email),
    });

    if (existingUser) {
      throw new Error(EErrors.REG_ERR);
    }

    const [user] = await this.db.insert(userTable).values({ name }).returning();

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
  };

  findByEmail = async (email: string) => {
    const [user] = await this.db
      .select({
        id: userTable.id,
        name: userTable.name,
        email: userConfigTable.email,
        password: userConfigTable.password,
      })
      .from(userTable)
      .leftJoin(userConfigTable, eq(userTable.id, userConfigTable.userId))
      .where(eq(userConfigTable.email, email));

    return user;
  };

  // TODO: fix
  findById = async (id: string, kek: string) => {
    const user = await this.db.query.user.findFirst({
      where: (it, { eq }) => eq(it.id, kek),
    });

    return user;
  };
}
