import type { StockPrice } from "@/server/infrastructure/models/stock-price.model";

export interface IStockDataService {
  getDailyStockData(
    params: Pick<StockPrice, "stockId" | "date">,
  ): Promise<StockPrice>;
}
