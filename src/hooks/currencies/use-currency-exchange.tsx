"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getBaseCurrency,
  getDailyCurrencyExchange,
} from "@/server/controllers/currency.controller";

export function useCurrencyExchange() {
  const { data, refetch } = useQuery({
    queryKey: ["currencyExchange"],
    queryFn: async () => ({
      currencyExchange: await getDailyCurrencyExchange(),
      baseCurrency: await getBaseCurrency(),
    }),
  });

  return { ...data, refetch };
}
