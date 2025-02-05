import type { BankAccount } from "@/server/infrastructure/models/bank-account.model";

export interface IBankUseCase {
  getBankAccounts(): Promise<BankAccount[]>;
}
