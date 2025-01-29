import type {
  HoldingStockTableRow,
  HoldingStockTableSummary,
  StockTransactionTableRow,
} from "./stock.util.type";
import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";
import type { Stock } from "@/server/infrastructure/models/stock.model";
import type { StockPrice } from "@/server/infrastructure/models/stock-price.model";

export function transformStockTransationTableRows(
  transactions: StockTransaction[],
): StockTransactionTableRow[] {
  return transactions.map((transaction) => ({
    ...transaction,
    submittedAt: new Date(transaction.submittedAt).toLocaleString("en-gb"),
    formattedType: transaction.type.replace("_", " "),
    executedPrice: Number(transaction.executedPrice).toFixed(2),
    shares: Number(transaction.shares).toFixed(8),
    total: (
      Number(transaction.executedPrice) * Number(transaction.shares) +
      (transaction.type === "BUY" ? +transaction.fee : -transaction.fee)
    ).toFixed(2),
  }));
}

export function transformHoldingStockTableRowsAndSummary(
  stocks: Stock[],
  stockPrices: StockPrice[],
): { summary: HoldingStockTableSummary; rows: HoldingStockTableRow[] } {
  const stockWithPrices = stocks.map((stock, idx) => ({
    ...stock,
    price: stockPrices[idx].close,
  }));

  const totalBuyPrices = stockWithPrices
    .map(({ averagePrice, holding }) => Number(averagePrice) * Number(holding))
    .reduce((cum, curr) => cum + curr, 0);
  const totalHoldingPrices = stockWithPrices
    .map(({ price, holding }) => Number(price) * Number(holding))
    .reduce((cum, curr) => cum + curr, 0);
  const totalHoldingGains = totalHoldingPrices - totalBuyPrices;

  return {
    summary: {
      totalHoldingPrices: totalHoldingPrices.toFixed(2),
      totalHoldingGains: `${totalHoldingGains > 0 ? "+" : ""}${totalHoldingGains.toFixed(2)}`,
      totalHoldingGainsPercent: `${totalHoldingGains > 0 ? "+" : ""}${((totalHoldingGains / totalBuyPrices) * 100).toFixed(2)}`,
    },
    rows: stockWithPrices
      .map((stock) => {
        const totalPrice = Number(stock.price) * Number(stock.holding);
        const totalBuyPrice =
          Number(stock.averagePrice) * Number(stock.holding);
        const allocation = (totalPrice / totalHoldingPrices) * 100;
        const totalGain = totalPrice - totalBuyPrice;
        return {
          ...stock,
          holding: Number(stock.holding).toFixed(4),
          averagePrice: Number(stock.averagePrice).toFixed(2),
          totalPrice: totalPrice.toFixed(2),
          allocation: allocation.toFixed(2),
          totalGain: `${totalGain > 0 ? "+" : ""}${totalGain.toFixed(2)}`,
          totalGainPercent: `${totalGain > 0 ? "+" : ""}${((totalGain / totalBuyPrice) * 100).toFixed(2)}`,
        };
      })
      .toSorted(
        (a, b) =>
          -(
            Number(a.price) * Number(a.holding) -
            Number(b.price) * Number(b.holding)
          ),
      ),
  };
}
