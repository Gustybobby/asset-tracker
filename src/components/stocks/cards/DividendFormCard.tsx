"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DividendForm from "../dividends/DividendForm";

interface DividendFormCardProps {
  className?: string;
  onSuccessSubmit?: () => void;
}

export default function DividendFormCard({
  className,
  onSuccessSubmit,
}: DividendFormCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create new dividend record</CardTitle>
      </CardHeader>
      <CardContent>
        <DividendForm onSuccessSubmit={onSuccessSubmit} />
      </CardContent>
    </Card>
  );
}
