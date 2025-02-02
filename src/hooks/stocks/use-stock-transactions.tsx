"use client";

import { transformStockTransationTableRows } from "@/lib/utils/stock/stock.util";
import { getStockTransactionsByMonth } from "@/server/controllers/stock.controller";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useStockTransactions() {
  const [date, setDate] = useState<Date>(new Date());
  const { data, refetch } = useQuery({
    queryKey: ["stockTransactions", date],
    queryFn: async ({ queryKey }) =>
      transformStockTransationTableRows(
        await getStockTransactionsByMonth(new Date(queryKey[1])),
      ),
  });

  return { stockTransactions: data, refetch, date, setDate };
}
