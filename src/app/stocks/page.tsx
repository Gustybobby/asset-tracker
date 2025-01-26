import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStockTable from "@/components/stocks/HoldingStockTable";
import StockRepo from "@/server/infrastructure/repos/stock.repo";
import StockTransactionForm from "@/components/stocks/StockTransactionForm";
import StockTransactionTable from "@/components/stocks/StockTransactionTable";
import TradePerformanceTable from "@/components/stocks/TradePerformanceTable";

export default async function StockPage() {
  const stockRepo = new StockRepo();
  const [holdingStocks, stockTransactions, tradePerformances] =
    await Promise.all([
      stockRepo.findHoldingStocks(),
      stockRepo.findStockTransactions(),
      stockRepo.findTradePerformances(),
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
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Your Trade Performances</CardTitle>
        </CardHeader>
        <CardContent>
          <TradePerformanceTable tradePerformances={tradePerformances} />
        </CardContent>
      </Card>
    </main>
  );
}
