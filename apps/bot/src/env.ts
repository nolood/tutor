import { z } from "zod";

export const EnvSchema = z.object({
  TG_TOKEN: z.string(),
});

const envObj = {
  TG_TOKEN: process.env.TG_TOKEN,
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
