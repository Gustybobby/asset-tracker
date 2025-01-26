import type { IStockRepo } from "@/server/interfaces/infrastructure/repos/stock.repo.interface";
import type { DB } from "@/db";
import type { Stock } from "../models/stock.model";
import type { StockTransaction } from "../models/stock-transaction.model";
import { db } from "@/db";
import { stocksTable, stockTransactionsTable } from "@/db/schema";
import { eq, gt, sql } from "drizzle-orm";
import { RepoSelectNotFoundError } from "./error";

export default class StockRepo implements IStockRepo {
  async findStockById(stockId: Stock["id"]): Promise<Stock> {
    return this._findStockById(db, stockId);
  }

  async findHoldingStocks(): Promise<Stock[]> {
    return db.select().from(stocksTable).where(gt(stocksTable.holding, "0"));
  }

  async createBuyTransaction(
    data: Omit<StockTransaction, "id" | "type">,
  ): Promise<StockTransaction> {
    return db.transaction(async (tx) => {
      const stock = await this._findOrCreateStockById(tx, data.stockId);
      await tx
        .update(stocksTable)
        .set({ holding: sql`${stocksTable.holding} + ${data.shares}` })
        .where(eq(stocksTable.id, stock.id));

      return tx
        .insert(stockTransactionsTable)
        .values({ ...data, type: "BUY" })
        .returning()
        .then((results) => results[0]);
    });
  }

  createSellTransaction(
    data: Omit<StockTransaction, "id" | "type">,
  ): Promise<StockTransaction> {
    return db.transaction(async (tx) => {
      const stock = await this._findStockById(tx, data.stockId);
      await tx
        .update(stocksTable)
        .set({
          holding: sql`GREATEST(${stocksTable.holding} - ${data.shares}, 0)`,
        })
        .where(eq(stocksTable.id, stock.id));

      return tx
        .insert(stockTransactionsTable)
        .values({ ...data, type: "SELL" })
        .returning()
        .then((results) => results[0]);
    });
  }

  createSellAllTransaction(
    data: Omit<StockTransaction, "id" | "type" | "shares">,
  ): Promise<StockTransaction> {
    return db.transaction(async (tx) => {
      const stock = await this._findStockById(tx, data.stockId);
      await tx
        .update(stocksTable)
        .set({ holding: "0" })
        .where(eq(stocksTable.id, stock.id));

      return tx
        .insert(stockTransactionsTable)
        .values({
          ...data,
          type: "SELL_ALL",
          shares: stock.holding,
        })
        .returning()
        .then((results) => results[0]);
    });
  }

  private async _findStockById(tx: DB, stockId: Stock["id"]): Promise<Stock> {
    const stocks = await tx
      .select()
      .from(stocksTable)
      .where(eq(stocksTable.id, stockId));
    if (stocks.length === 0) {
      throw new RepoSelectNotFoundError(stocksTable, { id: stockId });
    }
    return stocks[0];
  }

  private async _findOrCreateStockById(
    tx: DB,
    stockId: Stock["id"],
  ): Promise<Stock> {
    return this._findStockById(tx, stockId).catch(() =>
      tx
        .insert(stocksTable)
        .values({ id: stockId, holding: "0" })
        .returning()
        .then((results) => results[0]),
    );
  }
}
