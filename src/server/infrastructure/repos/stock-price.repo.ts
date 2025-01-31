import type { IStockPriceRepo } from "@/server/interfaces/infrastructure/repos/stock-price.repo.interface";
import type { StockPrice } from "../models/stock-price.model";
import { db } from "@/db";
import { stockPricesTable } from "@/db/schema/schema";
import { and, eq } from "drizzle-orm";
import { RepoSelectNotFoundError } from "./error";

export default class StockPriceRepo implements IStockPriceRepo {
  async findStockPrice(
    params: Pick<StockPrice, "stockId" | "date">,
  ): Promise<StockPrice> {
    const stockPrices = await db
      .select()
      .from(stockPricesTable)
      .where(
        and(
          eq(stockPricesTable.stockId, params.stockId),
          eq(stockPricesTable.date, params.date),
        ),
      );
    if (stockPrices.length === 0) {
      throw new RepoSelectNotFoundError(stockPricesTable, params);
    }
    return stockPrices[0];
  }

  async createStockPrice(data: Omit<StockPrice, "id">): Promise<StockPrice> {
    return db
      .insert(stockPricesTable)
      .values(data)
      .returning()
      .then((results) => results[0]);
  }
}
