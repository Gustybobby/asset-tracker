"use client";

import { useAmountVisibility } from "@/hooks/stocks/use-amount-visibility";
import { useBankAccounts } from "@/hooks/cash/use-bank-accounts";
import BankAccountsCard from "@/components/cash/cards/BankAccountsCard";

export default function CashPage() {
  const { visible: amountVisible } = useAmountVisibility();
  const { bankAccounts } = useBankAccounts();

  return (
    <main className="grid h-[94vh] w-full grid-cols-4 gap-2 overflow-auto p-2">
      <div className="col-span-2"></div>
      <BankAccountsCard
        className="col-span-2"
        amountVisible={amountVisible}
        bankAccounts={bankAccounts}
      />
    </main>
  );
}
