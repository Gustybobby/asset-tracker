import {
  date,
  index,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { timestampColumns, timestamptz } from "./schema.helper";
import { STOCK_ID_MAX_LENGTH } from "./schema.config";

export const configsTable = pgTable("configs", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const currencyExchangesTable = pgTable("currency_exchanges", {
  id: serial("id").primaryKey(),
  date: date("date", { mode: "date" }).notNull().unique(),
  toUSD: numeric("to_usd").notNull(),
});

export const stocksTable = pgTable("stocks", {
  id: varchar("id", { length: STOCK_ID_MAX_LENGTH }).primaryKey(),
  holding: numeric("holding").notNull(),
  averagePrice: numeric("average_price").notNull(),
  ...timestampColumns,
});

export const stockPricesTable = pgTable(
  "stock_prices",
  {
    id: serial("id").primaryKey(),
    stockId: varchar("stock_id", { length: STOCK_ID_MAX_LENGTH })
      .references(() => stocksTable.id)
      .notNull(),
    date: date("date", { mode: "date" }).notNull(),
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
    stockId: varchar("stock_id", { length: STOCK_ID_MAX_LENGTH })
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

export const dividendsTable = pgTable("dividends", {
  id: serial("id").primaryKey(),
  amount: numeric("amount").notNull(),
  withHoldingTax: numeric("with_holding_tax").notNull(),
  stockId: varchar("stock_id", { length: STOCK_ID_MAX_LENGTH })
    .references(() => stocksTable.id)
    .notNull(),
  receivedAt: timestamptz("received_at").notNull(),
});
