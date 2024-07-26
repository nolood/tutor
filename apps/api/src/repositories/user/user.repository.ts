import { Repository } from "../repository.class";

import { userTable } from "~/db/schema/user/user.schema";

export class UserRepository extends Repository {
  getAll = async () => {
    const user = await this.db.select().from(userTable);

    // const user = this.db.query.user.findFirst();

    return user;
  };
}
