import type { AnyPgTable } from "drizzle-orm/pg-core";
import { getTableName } from "drizzle-orm";

export class RepoDefaultError extends Error {
  readonly tableName: string;
  readonly code: string;
  readonly params: string;

  constructor(
    table: AnyPgTable,
    code = "GUST-REPO-000",
    params?: Record<string, unknown>,
  ) {
    const tableName = getTableName(table);
    super(`[code:${code}][table:${tableName}] `);
    this.tableName = tableName;
    (this.code = code), (this.params = JSON.stringify(params));
  }
}

export class RepoSelectNotFoundError extends RepoDefaultError {
  constructor(table: AnyPgTable, params?: Record<string, unknown>) {
    super(table, "GUST-REPO-404-SEL", params);
    this.message += "No matching rows from select";
  }
}

export class RepoUpdateNotFoundError extends RepoDefaultError {
  constructor(table: AnyPgTable, params?: Record<string, unknown>) {
    super(table, "GUST-REPO-404-UPD", params);
    this.message += "No matching rows to update";
  }
}
