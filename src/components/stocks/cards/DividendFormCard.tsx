import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DividendForm from "../dividends/DividendForm";

export default function DividendFormCard({
  className,
}: {
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create new dividend record</CardTitle>
      </CardHeader>
      <CardContent>
        <DividendForm />
      </CardContent>
    </Card>
  );
}
