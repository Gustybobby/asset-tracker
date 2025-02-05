"use client";

import BankAccountsCard from "@/components/cash/cards/BankAccountsCard";
import { useBankAccounts } from "@/hooks/cash/use-bank-accounts";

export default function CashPage() {
  const { bankAccounts } = useBankAccounts();

  return (
    <main className="grid h-[94vh] w-full grid-cols-4 gap-2 overflow-auto p-2">
      <div className="col-span-2"></div>
      <BankAccountsCard className="col-span-2" bankAccounts={bankAccounts} />
    </main>
  );
}
