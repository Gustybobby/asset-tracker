import type { DB } from "@/db";
import type { IStockTransactionRepo } from "@/server/interfaces/infrastructure/repos/stock-transaction.repo.interface";
import type { StockTransaction } from "../models/stock-transaction.model";
import { stockTransactionsTable } from "@/db/schema";

export default class StockTransactionRepo implements IStockTransactionRepo {
  async createStockTransactions(
    db: DB,
    dataList: Omit<StockTransaction, "id" | "createdAt">,
  ): Promise<StockTransaction[]> {
    return db.insert(stockTransactionsTable).values(dataList).returning();
  }
}
