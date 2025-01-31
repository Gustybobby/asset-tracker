"use client";

import { useAmountVisibility } from "@/hooks/stocks/use-amount-visibility";
import { useStockTransactions } from "@/hooks/stocks/use-stock-transactions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StockTransactionTable from "../transactions/StockTransactionTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function StockTransactionsCard({
  className,
}: {
  className?: string;
}) {
  const { visible } = useAmountVisibility();
  const { stockTransactions } = useStockTransactions();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {stockTransactions ? (
          <StockTransactionTable
            transactions={stockTransactions}
            amountVisible={visible}
          />
        ) : (
          <TableSkeleton colNums={7} rowNums={9} />
        )}
      </CardContent>
    </Card>
  );
}
