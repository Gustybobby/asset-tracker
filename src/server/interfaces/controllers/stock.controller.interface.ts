import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";

export interface IStockController {
  createTransaction(
    data: Omit<StockTransaction, "id">,
  ): Promise<StockTransaction>;
}
