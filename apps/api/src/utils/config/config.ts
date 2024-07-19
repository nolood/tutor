import * as dotenv from "dotenv";
import { z } from "zod";

import type { Logger } from "../../types/types";

dotenv.config();

const ConfigSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "PORT must be a number",
    }),
});

const result = ConfigSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid configuration:", result.error.errors);
  process.exit(1);
}

export type ConfigData = {
  port: number;
};

class Config {
  private port?: number;
  protected log: Logger;
  private op = "config";

  constructor(log: Logger) {
    this.log = log;
  }

  public get = (): ConfigData => {
    this.log.info("Configuration loaded", { op: this.op });

    this.validate();

    return {
      port: this.port,
    } as ConfigData;
  };

  private validate = () => {
    const result = ConfigSchema.safeParse(process.env);

    if (!result.success) {
      this.log.error(`Invalid configuration:`, {
        op: this.op,
        error: result.error.errors,
      });
      process.exit(1);
    }

    this.port = result.data.PORT;

    return true;
  };
}

// Экспортируем Config класс
export { Config };
