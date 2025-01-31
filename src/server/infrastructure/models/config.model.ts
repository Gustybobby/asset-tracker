import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { configsTable } from "@/db/schema";

export const ConfigKey = z.enum(["BASE_CURRENCY"]);
export type ConfigKey = z.infer<typeof ConfigKey>;

export const Config = createSelectSchema(configsTable).extend({
  key: ConfigKey,
});
export type Config = z.infer<typeof Config>;
