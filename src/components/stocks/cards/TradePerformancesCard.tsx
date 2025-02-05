"use client";

import type {
  TradePerformanceTableRow,
  TradePerformanceTableSummary,
} from "@/lib/utils/stock/stock.util.type";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TradePerformanceTable from "../performances/TradePerformanceTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

interface TradePerformancesCardProps {
  className?: string;
  amountVisible: boolean;
  tradePerformances?: TradePerformanceTableRow[];
  tradePerformancesSummary?: TradePerformanceTableSummary;
}

export default function TradePerformancesCard({
  className,
  amountVisible,
  tradePerformances,
  tradePerformancesSummary,
}: TradePerformancesCardProps) {
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
            amountVisible={amountVisible}
          />
        ) : (
          <TableSkeleton colNums={5} rowNums={10} />
        )}
      </CardContent>
    </Card>
  );
}
