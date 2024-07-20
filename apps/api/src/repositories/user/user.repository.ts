import { Repository } from "../repository.class";

export class UserRepository extends Repository {
  getAll = async () => {
    const user = await this.db.query.user.findFirst();

    return user;
  };
}
