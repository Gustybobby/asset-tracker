import type { CurrencyExchange } from "@/server/infrastructure/models/currency-exchange.model";

export interface ICurrencyUseCase {
  getDailyCurrencyExchange(): Promise<CurrencyExchange>;
}
