"use client";

import { useQuery } from "@tanstack/react-query";
import { getDailyCurrencyExchange } from "@/server/controllers/currency.controller";

export default function useCurrencyExchange() {
  const { data, refetch } = useQuery({
    queryKey: ["currencyExchange"],
    queryFn: getDailyCurrencyExchange,
  });

  return {
    currencyExchange: data,
    refetch,
  };
}
