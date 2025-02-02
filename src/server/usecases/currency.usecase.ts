import type { ICurrencyUseCase } from "../interfaces/usecases/currency.usecase.interface";
import type { IConfigService } from "../interfaces/infrastructure/services/config.service.interface";
import type { IForexService } from "../interfaces/infrastructure/services/forex.service.interface";
import type { CurrencyExchange } from "../infrastructure/models/currency-exchange.model";

export default class CurrencyUseCase implements ICurrencyUseCase {
  constructor(
    private readonly configService: IConfigService,
    private readonly forexService: IForexService,
  ) {}

  async getDailyCurrencyExchange(): Promise<CurrencyExchange> {
    const baseCurrencyConfig =
      await this.configService.getConfig("BASE_CURRENCY");
    return this.forexService.getConversionBaseToUSD(
      baseCurrencyConfig.value,
      new Date(),
    );
  }

  async getBaseCurrency(): Promise<string> {
    return this.configService
      .getConfig("BASE_CURRENCY")
      .then((config) => config.value);
  }
}
