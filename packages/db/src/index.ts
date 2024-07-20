import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";
import { env } from "./env";
import postgres from "postgres"


const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient, { schema });
