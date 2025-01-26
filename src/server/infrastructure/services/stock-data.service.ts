import type { IStockDataService } from "@/server/interfaces/infrastructure/services/stock-data.service.interface";
import type { IStockPriceRepo } from "@/server/interfaces/infrastructure/repos/stock-price.repo.interface";
import type { StockPrice } from "../models/stock-price.model";

export default class StockDataService implements IStockDataService {
  constructor(private readonly stockPriceRepo: IStockPriceRepo) {}

  async getDailyStockData(
    params: Pick<StockPrice, "stockId" | "date">,
  ): Promise<StockPrice> {
    const stockPrice = await this.stockPriceRepo
      .findStockPrice(params)
      .catch(() => undefined);
    if (stockPrice) {
      return stockPrice;
    }
    const polygonStockData = await this.fetchPolygonDailyOpenClose(params);
    return this.stockPriceRepo.createStockPrice(polygonStockData);
  }

  private async fetchPolygonDailyOpenClose(
    params: Pick<StockPrice, "stockId" | "date">,
  ): Promise<Omit<StockPrice, "id">> {
    const formattedDate = [
      params.date.getFullYear(),
      String(params.date.getMonth() + 1).padStart(2, "0"),
      String(params.date.getDate()).padStart(2, "0"),
    ].join("-");
    const url = `https://api.polygon.io/v1/open-close/${params.stockId}/${formattedDate}?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`;
    console.log(`fetching ${url}`);
    const res = await fetch(url);
    const { open, close, status, message } = await res.json();
    if (!open || !close) {
      throw new Error(`[${status}]${message}`);
    }
    return { ...params, open, close };
  }
}
