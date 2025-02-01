import type {
  IStockUseCase,
  StockWithPrice,
} from "../interfaces/usecases/stock.usecase.interface";
import type {
  IStockRepo,
  TradePerformance,
} from "../interfaces/infrastructure/repos/stock.repo.interface";
import type { IStockDataService } from "../interfaces/infrastructure/services/stock-data.service.interface";
import type { Stock } from "../infrastructure/models/stock.model";
import type { StockTransaction } from "../infrastructure/models/stock-transaction.model";

export default class StockUseCase implements IStockUseCase {
  constructor(
    private readonly stockRepo: IStockRepo,
    private readonly stockDataService: IStockDataService,
  ) {}

  async getHoldingStocks(): Promise<Stock[]> {
    return this.stockRepo.findHoldingStocks();
  }

  async getHoldingStockWithPrices(): Promise<StockWithPrice[]> {
    return this.getHoldingStocks().then(async (holdingStocks) =>
      Promise.all(
        holdingStocks.map((stock) =>
          this.stockDataService
            .getDailyStockData({ stockId: stock.id, date: new Date() })
            .then((priceData) => ({ ...stock, price: priceData.close })),
        ),
      ),
    );
  }

  async getStockTransactions(): Promise<StockTransaction[]> {
    return this.stockRepo.findStockTransactions();
  }

  async createTransaction(
    data: Omit<StockTransaction, "id">,
  ): Promise<StockTransaction> {
    switch (data.type) {
      case "BUY":
        return this.stockRepo.createBuyTransaction(data);
      case "SELL":
        return this.stockRepo.createSellTransaction(data);
      case "SELL_ALL":
        return this.stockRepo.createSellAllTransaction(data);
      default:
        throw new Error("invalid transaction type");
    }
  }

  async getStockTradePerformances(): Promise<TradePerformance[]> {
    return this.stockRepo.findTradePerformances();
  }
}
