import logger from "@repo/logger";

import { type IBotContext } from "../context/context";

export const loggerMiddleware = async (
  ctx: IBotContext,
  next: () => Promise<void>,
) => {
  if (!ctx.log) {
    ctx.log = logger;
  }

  await next();
};
