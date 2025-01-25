import type { DB } from "@/db";
import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";

export interface IStockTransactionRepo {
  createStockTransactions(
    db: DB,
    dataList: Omit<StockTransaction, "id" | "createdAt">,
  ): Promise<StockTransaction[]>;
}
