import type { IStockController } from "../interfaces/controllers/stock.controller.interface";
import type { IStockUseCase } from "../interfaces/usecases/stock.usecase.interface";
import { StockTransaction } from "../infrastructure/models/stock-transaction.model";
import StockUseCase from "../usecases/stock.usecase";
import StockRepo from "../infrastructure/repos/stock.repo";

export default class StockController implements IStockController {
  constructor(
    private readonly stockUseCase: IStockUseCase = new StockUseCase(
      new StockRepo(),
    ),
  ) {}

  async createTransaction(
    data: Omit<StockTransaction, "id">,
  ): Promise<StockTransaction> {
    data = StockTransaction.omit({ id: true }).parse(data);
    return this.stockUseCase.createTransaction(data);
  }
}
