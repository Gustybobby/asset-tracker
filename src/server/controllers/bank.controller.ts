"use server";

import type { BankAccount } from "../infrastructure/models/bank-account.model";
import BankRepo from "../infrastructure/repos/bank.repo";
import BankUseCase from "../usecases/bank.usecase";

const bankUseCase = new BankUseCase(new BankRepo());

export async function getBankAccounts(): Promise<BankAccount[]> {
  return bankUseCase.getBankAccounts();
}
