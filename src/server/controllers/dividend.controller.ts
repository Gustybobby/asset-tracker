"use server";

import { Dividend } from "../infrastructure/models/dividend.model";
import DividendRepo from "../infrastructure/repos/dividend.repo";
import DividendUseCase from "../usecases/dividend.usecase";

const dividendUseCase = new DividendUseCase(new DividendRepo());

export async function getDividends(): Promise<Dividend[]> {
  return dividendUseCase.getDividends();
}

export async function createDividend(
  data: Omit<Dividend, "id">,
): Promise<Dividend> {
  return dividendUseCase.createDividend(
    Dividend.omit({ id: true }).parse(data),
  );
}
