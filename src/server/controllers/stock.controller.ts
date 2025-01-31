"use server";

import type { Stock } from "../infrastructure/models/stock.model";
import { TradePerformance } from "../interfaces/infrastructure/repos/stock.repo.interface";
import { StockTransaction } from "../infrastructure/models/stock-transaction.model";
import { Dividend } from "../infrastructure/models/dividend.model";
import StockUseCase from "../usecases/stock.usecase";
import StockRepo from "../infrastructure/repos/stock.repo";
import DividendRepo from "../infrastructure/repos/dividend.repo";
import StockDataService from "../infrastructure/services/stock-data.service";
import StockPriceRepo from "../infrastructure/repos/stock-price.repo";

export async function getHoldingStockWithPrices(): Promise<
  (Stock & { price: string | null })[]
> {
  const stockRepo = new StockRepo();
  const stockDataService = new StockDataService(new StockPriceRepo());
  return stockRepo
    .findHoldingStocks()
    .then(async (holdingStocks) =>
      Promise.all(
        holdingStocks.map((stock) =>
          stockDataService
            .getDailyStockData({ stockId: stock.id, date: new Date() })
            .then((priceData) => ({ ...stock, price: priceData.close })),
        ),
      ),
    );
}

export async function getStockTransactions(): Promise<StockTransaction[]> {
  const stockRepo = new StockRepo();
  return stockRepo.findStockTransactions();
}

export async function getStockTradePerformances(): Promise<TradePerformance[]> {
  const stockRepo = new StockRepo();
  return stockRepo.findTradePerformances();
}

export async function createStockTransaction(
  data: Omit<StockTransaction, "id">,
): Promise<StockTransaction> {
  const stockUseCase = new StockUseCase(new StockRepo(), new DividendRepo());
  return stockUseCase.createTransaction(
    StockTransaction.omit({ id: true }).parse(data),
  );
}

export async function getDividends(): Promise<Dividend[]> {
  const dividendRepo = new DividendRepo();
  return dividendRepo.findDividends();
}

export async function createDividend(
  data: Omit<Dividend, "id">,
): Promise<Dividend> {
  const stockUseCase = new StockUseCase(new StockRepo(), new DividendRepo());
  return stockUseCase.createDividend(Dividend.omit({ id: true }).parse(data));
}
