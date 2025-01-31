"use client";

import { transformStockTransationTableRows } from "@/lib/utils/stock/stock.util";
import { getStockTransactions } from "@/server/controllers/stock.controller";
import { useQuery } from "@tanstack/react-query";

export function useStockTransactions() {
  const { data, refetch } = useQuery({
    queryKey: ["stockTransactions"],
    queryFn: async () =>
      transformStockTransationTableRows(await getStockTransactions()),
  });

  return { stockTransactions: data, refetch };
}
