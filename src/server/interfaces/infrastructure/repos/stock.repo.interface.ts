import type { DB } from "@/db";
import type { Stock } from "@/server/infrastructure/models/stock.model";

export interface IStockRepo {
  createStocks(
    db: DB,
    dataList: Omit<Stock, "createdAt" | "updatedAt">[],
  ): Promise<Stock[]>;

  updateStockHolding(
    db: DB,
    data: Pick<Stock, "id" | "holding">,
  ): Promise<Stock>;
}
