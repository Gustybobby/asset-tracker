import type { StockPrice } from "@/server/infrastructure/models/stock-price.model";

export interface IStockPriceRepo {
  findStockPrice(
    params: Pick<StockPrice, "stockId" | "date">,
  ): Promise<StockPrice>;

  createStockPrice(data: Omit<StockPrice, "id">): Promise<StockPrice>;
}
