import type { Dividend } from "@/server/infrastructure/models/dividend.model";

export interface IDividendRepo {
  findDividends(): Promise<Dividend[]>;

  createDividend(data: Omit<Dividend, "id">): Promise<Dividend>;
}
