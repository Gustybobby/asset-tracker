"use client";

import { useQuery } from "@tanstack/react-query";
import { getBankAccounts } from "@/server/controllers/bank.controller";

export function useBankAccounts() {
  const { data, refetch } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: getBankAccounts,
  });

  return { bankAccounts: data, refetch };
}
