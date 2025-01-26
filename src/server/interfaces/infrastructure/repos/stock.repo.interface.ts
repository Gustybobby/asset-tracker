import type { Stock } from "@/server/infrastructure/models/stock.model";
import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";

export interface IStockRepo {
  findStockById(stockId: Stock["id"]): Promise<Stock>;

  findHoldingStocks(): Promise<Stock[]>;

  findStockTransactions(): Promise<StockTransaction[]>;

  createBuyTransaction(
    data: Omit<StockTransaction, "id" | "type">,
  ): Promise<StockTransaction>;

  createSellTransaction(
    data: Omit<StockTransaction, "id" | "type">,
  ): Promise<StockTransaction>;

  createSellAllTransaction(
    data: Omit<StockTransaction, "id" | "type" | "shares">,
  ): Promise<StockTransaction>;
}
