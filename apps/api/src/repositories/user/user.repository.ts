import type { ICreateUserDto, IUserDto } from "~/handlers/user/dto/user.dto";
import { Repository } from "../repository.class";

import { userTable } from "~/db/schema/user/user.schema";
import { sql } from "drizzle-orm";

export class UserRepository extends Repository {
  create = async ({ email, password, name }: ICreateUserDto) => {
    try {
      console.log(email, password, email, "repository");

      // Проверка существующих пользователей
      const existingUsers = await this.db
        .select()
        .from(userTable)
        .where(
          sql`${userTable.email} = ${email} OR ${userTable.name} = ${name}`
        );
      if (existingUsers.length > 0) {
        throw new Error("Пользователь с таким именем или email уже существует");
      }

      // Логирование SQL-запроса для отладки
      const query = this.db
        .insert(userTable)
        .values({
          email,
          name,
          password,
        })
        .returning();

      console.log("Generated SQL query:", query.getSQL());

      // Вставка нового пользователя
      const [user] = await query;

      if (!user || !user.id || !user.email || !user.name) {
        throw new Error("Ошибка создания пользователя");
      }

      console.log("User created successfully:", user);
      return user;
    } catch (error) {
      console.error("Error in UserRepository.create:", error);
      throw error; // Пробрасываем исключение, чтобы его поймал сервис
    }
  };
}
