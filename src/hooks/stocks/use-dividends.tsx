"use client";

import { getDividends } from "@/server/controllers/dividend.controller";
import { useQuery } from "@tanstack/react-query";

export function useDividends() {
  const { data, refetch } = useQuery({
    queryKey: ["dividends"],
    queryFn: async () => getDividends(),
  });

  return { dividends: data, refetch };
}
