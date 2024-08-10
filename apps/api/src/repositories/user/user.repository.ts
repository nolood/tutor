import { eq } from "drizzle-orm";

import { Repository } from "../repository.class";

import { EErrors } from "~/constants/enums/error-enum";
import { userTable } from "~/db/schema/user/user.schema";
import { userConfigTable } from "~/db/schema/user/userConfig.schema";
import type { TRegisterDto } from "~/handlers/auth/dto/auth.dto";
import type { TCreateOrUpdateUserConfig } from "~/handlers/bot/dto/bot.dto";

export class UserRepository extends Repository {
  getAll = async () => {
    const users = await this.db.select().from(userTable);
    return users;
  };

  create = async ({ email, password, name }: TRegisterDto) => {
    const existingUser = await this.db.query.userConfig.findFirst({
      where: eq(userConfigTable.email, email),
    });

    if (existingUser) {
      throw new Error(EErrors.REG_ERR);
    }

    const [user] = await this.db.insert(userTable).values({ name }).returning();

    const [userConfig] = await this.db
      .insert(userConfigTable)
      .values({
        userId: user.id,
        email,
        password,
      })
      .returning();

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

  findById = async (id: string) => {
    const [user] = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    return user;
  };

  createOrUpdateUserConfig = async (dto: TCreateOrUpdateUserConfig) => {
    const data = {
      tgId: dto.id.toString(),
      tgUsername: dto.username,
      tgFirstName: dto?.first_name,
      tgLastName: dto?.last_name,
      tgLanguageCode: dto.language_code,
    };

    const [config] = await this.db
      .insert(userConfigTable)
      .values(data)
      .returning();

    return config;
  };
}
