"use client";

import { useQuery } from "@tanstack/react-query";
import { transformHoldingStockTableRowsAndSummary } from "@/lib/utils/stock/stock.util";
import { getHoldingStockWithPrices } from "@/server/controllers/stock.controller";

export function useHoldingStocks() {
  const { data, refetch } = useQuery({
    queryKey: ["holdingStocks"],
    queryFn: async () =>
      transformHoldingStockTableRowsAndSummary(
        await getHoldingStockWithPrices(),
      ),
  });

  return {
    holdingStocks: data?.rows,
    holdingStocksSummary: data?.summary,
    refetch,
  };
}
