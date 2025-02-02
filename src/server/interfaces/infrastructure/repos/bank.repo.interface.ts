import type { BankAccount } from "@/server/infrastructure/models/bank-account.model";
import type { BankTransaction } from "@/server/infrastructure/models/bank-transaction.model";

export interface IBankRepo {
  findBankAccounts(): Promise<BankAccount[]>;

  findBankTransactionsByMonth(date: Date): Promise<BankTransaction[]>;

  createDepositTransaction(
    data: Omit<BankTransaction, "id" | "type" | "exchangeRate" | "accountId2">,
  ): Promise<BankTransaction>;

  createWithdrawTransaction(
    data: Omit<BankTransaction, "id" | "type" | "exchangeRate" | "accountId2">,
  ): Promise<BankTransaction>;

  createTransferTransaction(
    data: Omit<BankTransaction, "id" | "type" | "exchangeRate">,
  ): Promise<BankTransaction>;

  createExchangeTransaction(
    data: Omit<BankTransaction, "id" | "type">,
  ): Promise<BankTransaction>;
}
