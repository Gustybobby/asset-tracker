import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";

export interface IStockUseCase {
  createTransaction(
    data: Omit<StockTransaction, "id">,
  ): Promise<StockTransaction>;
}
