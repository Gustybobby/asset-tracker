import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStockList from "@/components/summary/HoldingStockList";
import StockRepo from "@/server/infrastructure/repos/stock.repo";

export default async function Home() {
  const holdingStocks = await new StockRepo().findHoldingStocks();
  return (
    <main className="grid w-full grid-cols-2 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Your Stock Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <HoldingStockList holdingStocks={holdingStocks} />
        </CardContent>
      </Card>
    </main>
  );
}
