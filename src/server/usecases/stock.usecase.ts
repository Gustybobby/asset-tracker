import type { StockTransaction } from "../infrastructure/models/stock-transaction.model";
import type { IStockRepo } from "../interfaces/infrastructure/repos/stock.repo.interface";
import type { IStockUseCase } from "../interfaces/usecases/stock.usecase.interface";

export default class StockUseCase implements IStockUseCase {
  constructor(private readonly stockRepo: IStockRepo) {}

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
}
