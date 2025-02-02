import type { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { bankTransactionsTable } from "@/db/schema/schema";

export const BankTransaction = createSelectSchema(bankTransactionsTable);
export type BankTransaction = z.infer<typeof BankTransaction>;
