import type { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { currencyExchangesTable } from "@/db/schema/schema";

export const CurrencyExchange = createSelectSchema(currencyExchangesTable);
export type CurrencyExchange = z.infer<typeof CurrencyExchange>;
