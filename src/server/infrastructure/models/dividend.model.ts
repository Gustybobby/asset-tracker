import type { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { dividendsTable } from "@/db/schema";

export const Dividend = createSelectSchema(dividendsTable);
export type Dividend = z.infer<typeof Dividend>;
