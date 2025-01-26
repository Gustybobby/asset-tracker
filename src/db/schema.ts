import { numeric, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestampColumns, timestamptz } from "./schema.helper";

export const stocksTable = pgTable("stocks", {
  id: varchar("id", { length: 16 }).primaryKey(),
  holding: numeric("holding").notNull(),
  averagePrice: numeric("average_price").notNull(),
  ...timestampColumns,
});

export const stockTransactionTypeEnum = pgEnum("stock_transaction_type", [
  "BUY",
  "SELL",
  "SELL_ALL",
]);

export const stockTransactionsTable = pgTable("stock_transactions", {
  id: serial("id").primaryKey(),
  stockId: varchar("stock_id", { length: 16 })
    .references(() => stocksTable.id)
    .notNull(),
  executedPrice: numeric("executed_price").notNull(),
  shares: numeric("shares").notNull(),
  fee: numeric("fee").notNull(),
  type: stockTransactionTypeEnum("type").notNull(),
  submittedAt: timestamptz("submitted_at").notNull(),
});
