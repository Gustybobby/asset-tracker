"use server";

import type { StockTransactionFormSchema } from "@/components/stocks/StockTransactionForm";
import StockController from "@/server/controllers/stock.controller";

export async function submitStockTransactionForm(
  data: StockTransactionFormSchema,
) {
  await new StockController().createTransaction({
    ...data,
    executedPrice: String(data.executedPrice),
    shares: String(data.shares),
    fee: String(data.fee),
  });
}
