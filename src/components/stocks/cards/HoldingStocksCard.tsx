"use client";

import { useHoldingStocks } from "@/hooks/stocks/use-holding-stocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStockTable from "../holdings/HoldingStockTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

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
          <TableSkeleton colNums={6} rowNums={6} />
        )}
      </CardContent>
    </Card>
  );
}
