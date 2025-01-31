"use client";

import { useHoldingStocks } from "@/hooks/stocks/use-holding-stocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStocksChart from "../holdings/HoldingStocksChart";

export default function HoldingStocksChartCard({
  className,
}: {
  className?: string;
}) {
  const { holdingStocks, holdingStocksSummary } = useHoldingStocks();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {holdingStocks && holdingStocksSummary && (
          <HoldingStocksChart
            holdingStocks={holdingStocks}
            summary={holdingStocksSummary}
          />
        )}
      </CardContent>
    </Card>
  );
}
