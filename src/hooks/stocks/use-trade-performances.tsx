"use client";

import { useQuery } from "@tanstack/react-query";
import { getStockTradePerformances } from "@/server/controllers/stock.controller";

export function useTradePerformances() {
  const { data, refetch } = useQuery({
    queryKey: ["stockTradePerformances"],
    queryFn: async () => getStockTradePerformances(),
  });

  return { tradePerformances: data, refetch };
}
