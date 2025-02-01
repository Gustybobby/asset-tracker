"use client";

import { useHoldingStocks } from "@/hooks/stocks/use-holding-stocks";
import { useStockTransactions } from "@/hooks/stocks/use-stock-transactions";
import { useTradePerformances } from "@/hooks/stocks/use-trade-performances";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StockTransactionForm from "../transactions/StockTransactionForm";

export default function StockTransactionFormCard({
  className,
}: {
  className?: string;
}) {
  const { refetch: refetchHoldingStocks } = useHoldingStocks();
  const { refetch: refetchStockTransactions } = useStockTransactions();
  const { refetch: refetchTradePerformances } = useTradePerformances();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create new transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <StockTransactionForm
          onSuccessSubmit={() => {
            refetchHoldingStocks();
            refetchStockTransactions();
            refetchTradePerformances();
          }}
        />
      </CardContent>
    </Card>
  );
}
