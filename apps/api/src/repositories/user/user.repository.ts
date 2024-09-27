import { BotJSON } from "./../../db/schema/bot/bot.type";
import { schema } from "./../../db/schema/index";
import { eq } from "drizzle-orm";

import { Repository } from "../repository.class";

import { EErrors } from "~/constants/enums/error-enum";
import { userTable } from "~/db/schema/user/user.schema";
import { userConfigTable } from "~/db/schema/user/userConfig.schema";
import type { TRegisterDto } from "~/handlers/auth/dto/auth.dto";
import type { TCreateOrUpdateUserConfig } from "~/handlers/bot/dto/bot.dto";
import { botTable } from "~/db/schema/bot/bot.schema";
import { clusterTable } from "~/db/schema/cluster/cluster.schema";

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

    return { user, userConfig };
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

  createOrUpdateUserConfig = async (
    dto: TCreateOrUpdateUserConfig,
    userId: string
  ) => {
    const defaultBotJSON: BotJSON = {
      callbacks: {
        start: {
          keyboard: [[{ callback: "start", text: "Начать" }]],
          message: "Добро пожаловать в бота",
        },
      },
      startKeyboard: [[{ callback: "start", text: "Начать" }]],
      startMessage: "Добро пожаловать в бота",
    };

    const data = {
      tgId: dto.id.toString(),
      tgUsername: dto.username,
      tgFirstName: dto?.first_name,
      tgLastName: dto?.last_name,
      tgLanguageCode: dto.language_code,
    };

    const [botConfig] = await this.db
      .insert(clusterTable)
      .values({
        schema: defaultBotJSON,
      })
      .returning();
    const existingBot = await this.db.query.bot.findFirst({
      where: eq(botTable.userId, userId),
    });
    if (existingBot) {
      const [updatedBot] = await this.db
        .update(botTable)
        .set({ clusterId: botConfig.id })
        .where(eq(botTable.id, existingBot.id))
        .returning();

      const [updatedCluster] = await this.db
        .update(clusterTable)
        .set({ schema: dto.schema })
        .where(eq(clusterTable.id, botConfig.id))
        .returning();

      return { updatedBot, updatedCluster };
    }
    const [bot] = await this.db
      .insert(botTable)
      .values({
        clusterId: botConfig.id,
        userId: userId,
      })
      .returning();
    const [config] = await this.db
      .insert(userConfigTable)
      .values(data)
      .returning()
      .onConflictDoUpdate({
        target: [
          userConfigTable.tgId,
          userConfigTable.tgUsername,
          userConfigTable.tgFirstName,
        ],
        set: data,
      });

    return { config, botConfig, bot };
  };
  getUpdatedBot = async (userId: string) => {
    const bot = await this.db.query.bot.findFirst({
      where: eq(botTable.userId, userId),
    });

    if (!bot?.clusterId) {
      throw new Error(EErrors.BOT_NOT_FOUND);
    }
    const clusterBot = await this.db.query.cluster.findFirst({
      where: eq(clusterTable.id, bot?.clusterId),
    });
    return { clusterBot, bot };
  };
}
