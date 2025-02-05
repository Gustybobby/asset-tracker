"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StockTransactionForm from "../transactions/StockTransactionForm";

interface StockTransactionFormCardProps {
  className?: string;
  onSuccessSubmit?: () => void;
}

export default function StockTransactionFormCard({
  className,
  onSuccessSubmit,
}: StockTransactionFormCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create new transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <StockTransactionForm onSuccessSubmit={onSuccessSubmit} />
      </CardContent>
    </Card>
  );
}
