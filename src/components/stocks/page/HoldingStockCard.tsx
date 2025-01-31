"use client";

import { useHoldingStocks } from "@/hooks/use-holding-stocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStockTable from "../HoldingStockTable";

export default function HoldingStocksCard({
  className,
}: {
  className?: string;
}) {
  const { holdingStocks, holdingStocksSummary } = useHoldingStocks();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your stocks</CardTitle>
      </CardHeader>
      <CardContent>
        {holdingStocks && holdingStocksSummary ? (
          <HoldingStockTable
            holdingStocks={holdingStocks}
            summary={holdingStocksSummary}
          />
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>
    </Card>
  );
}
