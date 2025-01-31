"use client";

import { useStockTransactions } from "@/hooks/stocks/use-stock-transactions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StockTransactionTable from "../transactions/StockTransactionTable";

export default function StockTransactionsCard({
  className,
}: {
  className?: string;
}) {
  const { stockTransactions } = useStockTransactions();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {stockTransactions ? (
          <StockTransactionTable transactions={stockTransactions} />
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>
    </Card>
  );
}
