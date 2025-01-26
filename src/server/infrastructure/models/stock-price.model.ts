import type { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { stockPricesTable } from "@/db/schema";

export const StockPrice = createSelectSchema(stockPricesTable);
export type StockPrice = z.infer<typeof StockPrice>;
