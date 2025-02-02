import type { IForexService } from "@/server/interfaces/infrastructure/services/forex.service.interface";
import type { ICurrencyExchangeRepo } from "@/server/interfaces/infrastructure/repos/currency-exchange.repo.interface";
import type { CurrencyExchange } from "../models/currency-exchange.model";

export default class ForexService implements IForexService {
  constructor(private readonly currencyExchangeRepo: ICurrencyExchangeRepo) {}

  async getConversionBaseToUSD(
    baseCurrency: string,
    date: Date,
  ): Promise<CurrencyExchange> {
    return this.currencyExchangeRepo
      .findCurrencyExchangeByDate(date)
      .catch(() =>
        this.fetchPolygonConversionData(baseCurrency, date)
          .then((close) =>
            this.currencyExchangeRepo.createCurrencyExchange({
              date,
              toUSD: close.toFixed(8),
            }),
          )
          .catch(() => {
            console.error("error fetching today exchange rate");
            return this.currencyExchangeRepo.findLatestCurrencyExchange();
          }),
      );
  }

  private async fetchPolygonConversionData(
    baseCurrency: string,
    date: Date,
  ): Promise<number> {
    const dateBefore = new Date(date);
    dateBefore.setDate(dateBefore.getDate() - 1);

    const formattedDate = date.toISOString().split("T")[0];
    const formattedDateBefore = dateBefore.toISOString().split("T")[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/C:${baseCurrency}USD/range/1/day/${formattedDateBefore}/${formattedDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`;
    console.info(`fetching ${url}`);
    const res = await fetch(url);
    const resJson = await res.json();

    return resJson.results[0].c;
  }
}
