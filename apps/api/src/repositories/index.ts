import type { Repository } from "./repository.class";

import type { EModule } from "~/types/types";

const getRepositories = (...args: Repository[]) => {
  return args.reduce<Record<EModule, Repository> | object>(
    (acc, item) => ({ ...acc, [item.name]: item }),
    {},
  ) as Record<EModule, Repository>;
};

export default getRepositories;
