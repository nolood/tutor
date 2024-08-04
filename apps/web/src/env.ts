import { config } from "dotenv";
import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
});

config();

const envObj = {
  NODE_ENV: process.env.NODE_ENV,
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
