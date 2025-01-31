"use client";

import { useAmountVisibility } from "@/hooks/stocks/use-amount-visibility";
import { useDividends } from "@/hooks/stocks/use-dividends";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DividendTable from "../dividends/DividendTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function DividendsCard({ className }: { className?: string }) {
  const { visible } = useAmountVisibility();
  const { dividends } = useDividends();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Dividend records</CardTitle>
      </CardHeader>
      <CardContent>
        {dividends ? (
          <DividendTable dividends={dividends} amountVisible={visible} />
        ) : (
          <TableSkeleton colNums={5} rowNums={6} />
        )}
      </CardContent>
    </Card>
  );
}
