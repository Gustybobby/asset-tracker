"use server";

import type { CurrencyExchange } from "../infrastructure/models/currency-exchange.model";
import CurrencyUseCase from "../usecases/currency.usecase";
import ConfigService from "../infrastructure/services/config.service";
import ConfigRepo from "../infrastructure/repos/config.repo";
import ForexService from "../infrastructure/services/forex.service";
import CurrencyExchangeRepo from "../infrastructure/repos/currency-exchange.repo";

const currencyUseCase = new CurrencyUseCase(
  new ConfigService(new ConfigRepo()),
  new ForexService(new CurrencyExchangeRepo()),
);

export async function getDailyCurrencyExchange(): Promise<CurrencyExchange> {
  return currencyUseCase.getDailyCurrencyExchange();
}

export async function getBaseCurrency(): Promise<string> {
  return currencyUseCase.getBaseCurrency();
}
