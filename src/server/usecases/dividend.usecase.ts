import type { IDividendUseCase } from "../interfaces/usecases/dividend.usecase.interface";
import type { IDividendRepo } from "../interfaces/infrastructure/repos/dividend.repo.interface";
import type { Dividend } from "../infrastructure/models/dividend.model";

export default class DividendUseCase implements IDividendUseCase {
  constructor(private readonly dividendRepo: IDividendRepo) {}

  async getDividends(): Promise<Dividend[]> {
    return this.dividendRepo.findDividends();
  }

  async createDividend(data: Omit<Dividend, "id">): Promise<Dividend> {
    return this.dividendRepo.createDividend(data);
  }
}
