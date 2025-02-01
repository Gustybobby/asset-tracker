"use client";

import { useDividends } from "@/hooks/stocks/use-dividends";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DividendForm from "../dividends/DividendForm";

export default function DividendFormCard({
  className,
}: {
  className?: string;
}) {
  const { refetch: refetchDividends } = useDividends();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create new dividend record</CardTitle>
      </CardHeader>
      <CardContent>
        <DividendForm onSuccessSubmit={() => refetchDividends()} />
      </CardContent>
    </Card>
  );
}
