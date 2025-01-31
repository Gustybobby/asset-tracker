import type { IConfigRepo } from "@/server/interfaces/infrastructure/repos/config.repo.interface";
import type { ConfigKey } from "../models/config.model";
import { Config } from "../models/config.model";
import { db } from "@/db";
import { configsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default class ConfigRepo implements IConfigRepo {
  async getConfig(key: ConfigKey): Promise<Config> {
    return db
      .select()
      .from(configsTable)
      .where(eq(configsTable.key, key))
      .then((results) => Config.parse(results[0]));
  }

  async updateConfigValue(config: Config): Promise<Config> {
    return db
      .update(configsTable)
      .set({ value: config.value })
      .where(eq(configsTable.key, config.key))
      .returning()
      .then((results) => Config.parse(results[0]));
  }
}
