import type { Dividend } from "@/server/infrastructure/models/dividend.model";

export interface IDividendUseCase {
  getDividends(): Promise<Dividend[]>;

  createDividend(data: Omit<Dividend, "id">): Promise<Dividend>;
}
