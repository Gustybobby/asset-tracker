"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TradePerformanceTable from "../performances/TradePerformanceTable";
import { useTradePerformances } from "@/hooks/stocks/use-trade-performances";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function TradePerformancesCard({
  className,
}: {
  className?: string;
}) {
  const { tradePerformances } = useTradePerformances();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your Trade Performances</CardTitle>
      </CardHeader>
      <CardContent>
        {tradePerformances ? (
          <TradePerformanceTable tradePerformances={tradePerformances} />
        ) : (
          <TableSkeleton colNums={5} rowNums={10} />
        )}
      </CardContent>
    </Card>
  );
}
