import { Pool } from "pg";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import type { PgTransaction } from "drizzle-orm/pg-core";
import "dotenv/config";

export const db = drizzle({
  client: new Pool({ connectionString: process.env.DATABASE_URL }),
});

type TransactionDB = PgTransaction<
  NodePgQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;

export type DB = typeof db | TransactionDB;
