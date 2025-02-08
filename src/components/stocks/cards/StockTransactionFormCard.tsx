"use client";

import type { BankAccount } from "@/server/infrastructure/models/bank-account.model";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StockTransactionForm from "../transactions/StockTransactionForm";

interface StockTransactionFormCardProps {
  className?: string;
  bankAccounts?: BankAccount[];
  onSuccessSubmit?: () => void;
}

export default function StockTransactionFormCard({
  className,
  bankAccounts,
  onSuccessSubmit,
}: StockTransactionFormCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create new transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <StockTransactionForm
          bankAccounts={bankAccounts}
          onSuccessSubmit={onSuccessSubmit}
        />
      </CardContent>
    </Card>
  );
}
