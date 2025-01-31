"use client";

import { useAmountVisibility } from "@/hooks/stocks/use-amount-visibility";
import { useTradePerformances } from "@/hooks/stocks/use-trade-performances";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TradePerformanceTable from "../performances/TradePerformanceTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function TradePerformancesCard({
  className,
}: {
  className?: string;
}) {
  const { visible } = useAmountVisibility();
  const { tradePerformances, tradePerformancesSummary } =
    useTradePerformances();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your Trade Performances</CardTitle>
      </CardHeader>
      <CardContent>
        {tradePerformances && tradePerformancesSummary ? (
          <TradePerformanceTable
            tradePerformances={tradePerformances}
            summary={tradePerformancesSummary}
            amountVisible={visible}
          />
        ) : (
          <TableSkeleton colNums={5} rowNums={10} />
        )}
      </CardContent>
    </Card>
  );
}
