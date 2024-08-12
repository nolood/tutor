import { config } from "dotenv";
import { z } from "zod";
config();

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  API_URL: z.string()
});


const envObj = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.NEXT_PUBLIC_API_URL
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
