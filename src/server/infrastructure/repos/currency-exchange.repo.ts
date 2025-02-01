import type { ICurrencyExchangeRepo } from "@/server/interfaces/infrastructure/repos/currency-exchange.repo.interface";
import type { CurrencyExchange } from "../models/currency-exchange.model";
import { db } from "@/db";
import { currencyExchangesTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export default class CurrencyExchangeRepo implements ICurrencyExchangeRepo {
  async findCurrencyExchangeByDate(date: Date): Promise<CurrencyExchange> {
    return db
      .select()
      .from(currencyExchangesTable)
      .where(eq(currencyExchangesTable.date, date))
      .then((results) => results[0]);
  }

  async createCurrencyExchange(
    data: Omit<CurrencyExchange, "id">,
  ): Promise<CurrencyExchange> {
    return db
      .insert(currencyExchangesTable)
      .values(data)
      .returning()
      .then((results) => results[0]);
  }
}
