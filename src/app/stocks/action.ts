"use server";

import type { DividendFormSchema } from "@/components/stocks/dividends/DividendForm";
import type { StockTransactionFormSchema } from "@/components/stocks/transactions/StockTransactionForm";
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

export async function submitDividendForm(data: DividendFormSchema) {
  await new StockController().createDividend({
    ...data,
    amount: String(data.amount),
    withHoldingTax: String(data.withHoldingTax),
  });
}
