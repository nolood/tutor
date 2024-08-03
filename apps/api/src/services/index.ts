import type { Service } from "./service.class";

import type { EModule } from "~/types/types";

const getServices = (...args: Service[]) => {
  return args.reduce<Record<EModule, Service> | object>(
    (acc, item) => ({ ...acc, [item.name]: item }),
    {},
  ) as Record<EModule, Service>;
};

export default getServices;
