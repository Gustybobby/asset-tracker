import { AnyPgTable } from "drizzle-orm/pg-core";

export class RepoDefaultError extends Error {
  constructor(
    readonly table: AnyPgTable,
    readonly code = "GUST-REPO-000",
  ) {
    super(`[code:${code}][table:${table._.name}] `);
  }
}

export class RepoUpdateNotFoundError extends RepoDefaultError {
  constructor(readonly table: AnyPgTable) {
    super(table, "GUST-REPO-404");
    this.message += "No matching rows to update";
  }
}
