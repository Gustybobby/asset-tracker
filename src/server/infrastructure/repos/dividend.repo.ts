import type { IDividendRepo } from "@/server/interfaces/infrastructure/repos/dividend.repo.interface";
import type { Dividend } from "../models/dividend.model";
import { db } from "@/db";
import { dividendsTable } from "@/db/schema/schema";
import { desc } from "drizzle-orm";

export default class DividendRepo implements IDividendRepo {
  async findDividends(): Promise<Dividend[]> {
    return db
      .select()
      .from(dividendsTable)
      .orderBy(desc(dividendsTable.receivedAt));
  }

  async createDividend(data: Omit<Dividend, "id">): Promise<Dividend> {
    return db
      .insert(dividendsTable)
      .values(data)
      .returning()
      .then((results) => results[0]);
  }
}
