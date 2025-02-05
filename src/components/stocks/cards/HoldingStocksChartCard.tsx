"use client";

import type {
  HoldingStockTableRow,
  HoldingStockTableSummary,
} from "@/lib/utils/stock/stock.util.type";
import type { CurrencyExchange } from "@/server/infrastructure/models/currency-exchange.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStocksChart from "../holdings/HoldingStocksChart";

interface HoldingStocksChartCardProps {
  className?: string;
  amountVisible: boolean;
  holdingStocks?: HoldingStockTableRow[];
  holdingStocksSummary?: HoldingStockTableSummary;
  currencyExchange?: CurrencyExchange;
  baseCurrency?: string;
}

export default function HoldingStocksChartCard({
  className,
  amountVisible,
  holdingStocks,
  holdingStocksSummary,
  currencyExchange,
  baseCurrency,
}: HoldingStocksChartCardProps) {
  const isFetched = !!(
    holdingStocks &&
    holdingStocksSummary &&
    currencyExchange &&
    baseCurrency
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetched && (
          <HoldingStocksChart
            holdingStocks={holdingStocks}
            summary={holdingStocksSummary}
            currencyExchange={currencyExchange}
            baseCurrency={baseCurrency}
            amountVisible={amountVisible}
          />
        )}
      </CardContent>
    </Card>
  );
}
