import { z } from "zod";

export const EnvSchema = z.object({
  TG_TOKEN1: z.string(),
  TG_TOKEN2: z.string(),
});

const envObj = {
  TG_TOKEN1: process.env.TG_TOKEN1,
  TG_TOKEN2: process.env.TG_TOKEN2,
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
