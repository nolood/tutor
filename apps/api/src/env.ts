import { config } from "dotenv";
import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string(),
  SECRET_KEY: z.string(),
});

config();

const envObj = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
};

let _env;

try {
  _env = EnvSchema.parse(envObj);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Validation error:", error.errors);
  } else {
    console.error("Unknown error:", error);
  }
  process.exit(1);
}

export const env = _env;
