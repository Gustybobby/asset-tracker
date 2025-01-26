import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStockTable from "@/components/stocks/HoldingStockTable";
import StockRepo from "@/server/infrastructure/repos/stock.repo";
import StockTransactionForm from "@/components/stocks/StockTransactionForm";
import StockTransactionTable from "@/components/stocks/StockTransactionTable";

export default async function Home() {
  const stockRepo = new StockRepo();
  const [holdingStocks, stockTransactions] = await Promise.all([
    stockRepo.findHoldingStocks(),
    stockRepo.findStockTransactions(),
  ]);
  return (
    <main className="grid w-full grid-cols-3 gap-2">
      <Card>
        <CardContent></CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Your stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <HoldingStockTable holdingStocks={holdingStocks} />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Your transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <StockTransactionTable transactions={stockTransactions} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Create new transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <StockTransactionForm />
        </CardContent>
      </Card>
    </main>
  );
}
