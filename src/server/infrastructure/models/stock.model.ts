import type { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { stocksTable } from "@/db/schema";

export const Stock = createSelectSchema(stocksTable);
export type Stock = z.infer<typeof Stock>;
