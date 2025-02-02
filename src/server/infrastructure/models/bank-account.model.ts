import type { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { bankAccountsTable } from "@/db/schema/schema";

export const BankAccount = createSelectSchema(bankAccountsTable);
export type BankAccount = z.infer<typeof BankAccount>;
