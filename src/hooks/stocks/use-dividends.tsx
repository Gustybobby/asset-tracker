"use client";

import { useQuery } from "@tanstack/react-query";
import { getDividends } from "@/server/controllers/stock.controller";

export function useDividends() {
  const { data, refetch } = useQuery({
    queryKey: ["dividends"],
    queryFn: async () => getDividends(),
  });

  return { dividends: data, refetch };
}
