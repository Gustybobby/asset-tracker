import {
  date,
  index,
  numeric,
  pgEnum,
  pgTable,
  serial,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { timestampColumns, timestamptz } from "./schema.helper";

export const stocksTable = pgTable("stocks", {
  id: varchar("id", { length: 16 }).primaryKey(),
  holding: numeric("holding").notNull(),
  averagePrice: numeric("average_price").notNull(),
  ...timestampColumns,
});

export const stockPricesTable = pgTable(
  "stock_prices",
  {
    id: serial().primaryKey(),
    stockId: varchar("stock_id", { length: 16 })
      .references(() => stocksTable.id)
      .notNull(),
    date: date("date").notNull(),
    open: numeric("open"),
    close: numeric("close"),
  },
  (table) => [
    unique().on(table.stockId, table.date),
    index("stock_prices_stock_id_idx").on(table.stockId),
  ],
);

export const stockTransactionTypeEnum = pgEnum("stock_transaction_type", [
  "BUY",
  "SELL",
  "SELL_ALL",
]);

export const stockTransactionsTable = pgTable(
  "stock_transactions",
  {
    id: serial("id").primaryKey(),
    stockId: varchar("stock_id", { length: 16 })
      .references(() => stocksTable.id)
      .notNull(),
    executedPrice: numeric("executed_price").notNull(),
    shares: numeric("shares").notNull(),
    fee: numeric("fee").notNull(),
    type: stockTransactionTypeEnum("type").notNull(),
    submittedAt: timestamptz("submitted_at").notNull(),
  },
  (table) => [index("stock_transactions_stock_id_idx").on(table.stockId)],
);
