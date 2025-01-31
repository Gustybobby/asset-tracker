import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";
import type { Stock } from "@/server/infrastructure/models/stock.model";
import type { TradePerformance } from "@/server/interfaces/infrastructure/repos/stock.repo.interface";

export interface StockTransactionTableRow
  extends Omit<StockTransaction, "submittedAt"> {
  submittedAt: string;
  formattedType: string;
  total: string;
}

export interface HoldingStockTableRow extends Stock {
  price: string | null;
  totalPrice: string;
  allocation: string;
  totalGain: string;
  totalGainPercent: string;
}

export interface HoldingStockTableSummary {
  totalHoldingPrices: string;
  totalHoldingGains: string;
  totalHoldingGainsPercent: string;
}

export interface TradePerformanceTableRow extends TradePerformance {
  isHolding: boolean;
  isProfit: boolean;
  isProfitWithFee: boolean;
  profitWithFee: string;
}

export interface TradePerformanceTableSummary {
  capitalizedProfitNoFee: string;
  totalFee: string;
  capitalizedProfit: string;
}
