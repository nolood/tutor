import type { Handler } from "./handler.class";

import type { EModule } from "~/types/types";

const getHandlers = (...args: Handler[]) => {
  return args.reduce<Record<EModule, Handler> | object>(
    (acc, item) => ({ ...acc, [item.name]: item }),
    {},
  ) as Record<EModule, Handler>;
};

export default getHandlers;
