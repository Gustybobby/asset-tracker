import type { ICurrencyExchangeRepo } from "@/server/interfaces/infrastructure/repos/currency-exchange.repo.interface";
import type { CurrencyExchange } from "../models/currency-exchange.model";
import { db } from "@/db";
import { currencyExchangesTable } from "@/db/schema/schema";
import { desc, eq } from "drizzle-orm";
import { RepoSelectNotFoundError } from "./error";

export default class CurrencyExchangeRepo implements ICurrencyExchangeRepo {
  async findCurrencyExchangeByDate(date: Date): Promise<CurrencyExchange> {
    const currencyExchanges = await db
      .select()
      .from(currencyExchangesTable)
      .where(eq(currencyExchangesTable.date, date));
    if (currencyExchanges.length === 0) {
      throw new RepoSelectNotFoundError(currencyExchangesTable, { date });
    }
    return currencyExchanges[0];
  }

  async findLatestCurrencyExchange(): Promise<CurrencyExchange> {
    const currencyExchanges = await db
      .select()
      .from(currencyExchangesTable)
      .orderBy(desc(currencyExchangesTable.date))
      .limit(1);
    if (currencyExchanges.length === 0) {
      throw new RepoSelectNotFoundError(currencyExchangesTable);
    }
    return currencyExchanges[0];
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
