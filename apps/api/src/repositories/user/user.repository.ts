import { Repository } from "../repository.class";

export class UserRepository extends Repository {
  getAll = (id: string) => {
    this.log.info("getAll", { id });

    return this.db.query.user.findFirst();
  };
}
