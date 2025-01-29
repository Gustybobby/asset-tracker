import { Dividend } from "@/server/infrastructure/models/dividend.model";
import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";

export interface IStockController {
  createTransaction(
    data: Omit<StockTransaction, "id">,
  ): Promise<StockTransaction>;

  createDividend(data: Omit<Dividend, "id">): Promise<Dividend>;
}
