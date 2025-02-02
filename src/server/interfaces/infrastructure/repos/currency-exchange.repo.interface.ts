import type { CurrencyExchange } from "@/server/infrastructure/models/currency-exchange.model";

export interface ICurrencyExchangeRepo {
  findCurrencyExchangeByDate(date: Date): Promise<CurrencyExchange>;

  findLatestCurrencyExchange(): Promise<CurrencyExchange>;

  createCurrencyExchange(
    data: Omit<CurrencyExchange, "id">,
  ): Promise<CurrencyExchange>;
}
