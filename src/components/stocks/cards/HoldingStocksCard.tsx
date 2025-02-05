"use client";

import type {
  HoldingStockTableRow,
  HoldingStockTableSummary,
} from "@/lib/utils/stock/stock.util.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStockTable from "../holdings/HoldingStockTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

interface HoldingStocksCardProps {
  className?: string;
  amountVisible: boolean;
  holdingStocks?: HoldingStockTableRow[];
  holdingStocksSummary?: HoldingStockTableSummary;
}

export default function HoldingStocksCard({
  className,
  amountVisible,
  holdingStocks,
  holdingStocksSummary,
}: HoldingStocksCardProps) {
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
            amountVisible={amountVisible}
          />
        ) : (
          <TableSkeleton colNums={6} rowNums={6} />
        )}
      </CardContent>
    </Card>
  );
}
