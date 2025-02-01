"use server";

import type { StockWithPrice } from "../interfaces/usecases/stock.usecase.interface";
import type { TradePerformance } from "../interfaces/infrastructure/repos/stock.repo.interface";
import { StockTransaction } from "../infrastructure/models/stock-transaction.model";
import StockUseCase from "../usecases/stock.usecase";
import StockRepo from "../infrastructure/repos/stock.repo";
import StockDataService from "../infrastructure/services/stock-data.service";
import StockPriceRepo from "../infrastructure/repos/stock-price.repo";

const stockUseCase = new StockUseCase(
  new StockRepo(),
  new StockDataService(new StockPriceRepo()),
);

export async function getHoldingStockWithPrices(): Promise<StockWithPrice[]> {
  return stockUseCase.getHoldingStockWithPrices();
}

export async function getStockTransactions(): Promise<StockTransaction[]> {
  return stockUseCase.getStockTransactions();
}

export async function getStockTradePerformances(): Promise<TradePerformance[]> {
  return stockUseCase.getStockTradePerformances();
}

export async function createStockTransaction(
  data: Omit<StockTransaction, "id">,
): Promise<StockTransaction> {
  return stockUseCase.createTransaction(
    StockTransaction.omit({ id: true }).parse(data),
  );
}
