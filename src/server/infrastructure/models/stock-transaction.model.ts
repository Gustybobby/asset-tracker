import type { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { stockTransactionsTable } from "@/db/schema";

export const StockTransaction = createSelectSchema(stockTransactionsTable);
export type StockTransaction = z.infer<typeof StockTransaction>;
