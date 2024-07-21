import { schema } from "@repo/db/schemas";

import { Repository } from "../repository.class";

export class UserRepository extends Repository {
  getAll = async () => {
    const user = await this.db.select().from(schema.user);

    // const user = this.db.query.user.findFirst();

    return user;
  };
}
