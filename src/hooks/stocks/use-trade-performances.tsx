"use client";

import { useQuery } from "@tanstack/react-query";
import { getStockTradePerformances } from "@/server/controllers/stock.controller";
import { transformTradePerformanceTableRowsAndSummary } from "@/lib/utils/stock/stock.util";

export function useTradePerformances() {
  const { data, refetch } = useQuery({
    queryKey: ["stockTradePerformances"],
    queryFn: async () =>
      transformTradePerformanceTableRowsAndSummary(
        await getStockTradePerformances(),
      ),
  });

  return {
    tradePerformances: data?.rows,
    tradePerformancesSummary: data?.summary,
    refetch,
  };
}
