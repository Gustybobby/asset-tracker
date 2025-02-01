import type { Stock } from "@/server/infrastructure/models/stock.model";
import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";
import type { TradePerformance } from "../infrastructure/repos/stock.repo.interface";

export interface IStockUseCase {
  getHoldingStocks(): Promise<Stock[]>;

  getHoldingStockWithPrices(): Promise<StockWithPrice[]>;

  getStockTransactions(): Promise<StockTransaction[]>;

  createTransaction(
    data: Omit<StockTransaction, "id">,
  ): Promise<StockTransaction>;

  getStockTradePerformances(): Promise<TradePerformance[]>;
}

export interface StockWithPrice extends Stock {
  price: string | null;
}
