"use client";

import { useAmountVisibility } from "@/hooks/stocks/use-amount-visibility";
import { useHoldingStocks } from "@/hooks/stocks/use-holding-stocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStocksChart from "../holdings/HoldingStocksChart";
import useCurrencyExchange from "@/hooks/currencies/use-currency-exchange";

export default function HoldingStocksChartCard({
  className,
}: {
  className?: string;
}) {
  const { visible } = useAmountVisibility();
  const { holdingStocks, holdingStocksSummary } = useHoldingStocks();
  const { currencyExchange, baseCurrency } = useCurrencyExchange();

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
            amountVisible={visible}
          />
        )}
      </CardContent>
    </Card>
  );
}
