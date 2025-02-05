"use client";

import type { Dividend } from "@/server/infrastructure/models/dividend.model";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DividendTable from "../dividends/DividendTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

interface DividendsCardProps {
  className?: string;
  amountVisible: boolean;
  dividends?: Dividend[];
}

export default function DividendsCard({
  className,
  amountVisible,
  dividends,
}: DividendsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Dividend records</CardTitle>
      </CardHeader>
      <CardContent>
        {dividends ? (
          <DividendTable dividends={dividends} amountVisible={amountVisible} />
        ) : (
          <TableSkeleton colNums={5} rowNums={6} />
        )}
      </CardContent>
    </Card>
  );
}
