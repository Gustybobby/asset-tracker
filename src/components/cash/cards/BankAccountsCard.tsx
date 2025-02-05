"use client";

import type { BankAccount } from "@/server/infrastructure/models/bank-account.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BankAccountsCarousel from "../bank-accounts/BankAccountsCarousel";

interface BankAccountsCardProps {
  className?: string;
  bankAccounts?: BankAccount[];
}

export default function BankAccountsCard({
  className,
  bankAccounts,
}: BankAccountsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your accounts</CardTitle>
      </CardHeader>
      <CardContent className="px-24">
        {bankAccounts && <BankAccountsCarousel bankAccounts={bankAccounts} />}
      </CardContent>
    </Card>
  );
}
