import { Repository } from "../repository.class";

export class AuthRepository extends Repository {
  register = async () => {
    const existingUser = await this.db.select();
  };
}
