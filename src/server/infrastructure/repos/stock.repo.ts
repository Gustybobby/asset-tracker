import type { DB } from "@/db";
import type { IStockRepo } from "@/server/interfaces/infrastructure/repos/stock.repo.interface";
import type { Stock } from "../models/stock.model";
import { stocksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RepoUpdateNotFoundError } from "./error";

export default class StockRepo implements IStockRepo {
  async createStocks(
    db: DB,
    dataList: Omit<Stock, "createdAt" | "updatedAt">[],
  ): Promise<Stock[]> {
    return db.insert(stocksTable).values(dataList).returning();
  }

  async updateStockHolding(
    db: DB,
    data: Pick<Stock, "id" | "holding">,
  ): Promise<Stock> {
    const updatedStocks = await db
      .update(stocksTable)
      .set({ holding: data.holding })
      .where(eq(stocksTable.id, data.id))
      .returning();
    if (updatedStocks.length === 0) {
      throw RepoUpdateNotFoundError;
    }
    return updatedStocks[0];
  }
}
