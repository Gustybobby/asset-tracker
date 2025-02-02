import type { CurrencyExchange } from "@/server/infrastructure/models/currency-exchange.model";

export interface IForexService {
  getConversionBaseToUSD(
    baseCurrency: string,
    date: Date,
  ): Promise<CurrencyExchange>;
}
