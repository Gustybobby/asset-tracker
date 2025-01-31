import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StockTransactionForm from "../transactions/StockTransactionForm";

export default function StockTransactionFormCard({
  className,
}: {
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create new transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <StockTransactionForm />
      </CardContent>
    </Card>
  );
}
