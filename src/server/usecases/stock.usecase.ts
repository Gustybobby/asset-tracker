import type { Dividend } from "../infrastructure/models/dividend.model";
import type { StockTransaction } from "../infrastructure/models/stock-transaction.model";
import type { IDividendRepo } from "../interfaces/infrastructure/repos/dividend.repo.interface";
import type { IStockRepo } from "../interfaces/infrastructure/repos/stock.repo.interface";
import type { IStockUseCase } from "../interfaces/usecases/stock.usecase.interface";

export default class StockUseCase implements IStockUseCase {
  constructor(
    private readonly stockRepo: IStockRepo,
    private readonly dividendRepo: IDividendRepo,
  ) {}

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

  async createDividend(data: Omit<Dividend, "id">): Promise<Dividend> {
    return this.dividendRepo.createDividend(data);
  }
}
