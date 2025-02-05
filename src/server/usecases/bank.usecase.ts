import type { IBankUseCase } from "../interfaces/usecases/bank.usecase.interface";
import type { IBankRepo } from "../interfaces/infrastructure/repos/bank.repo.interface";
import type { BankAccount } from "../infrastructure/models/bank-account.model";

export default class BankUseCase implements IBankUseCase {
  constructor(private readonly bankRepo: IBankRepo) {}

  getBankAccounts(): Promise<BankAccount[]> {
    return this.bankRepo.findBankAccounts();
  }
}
