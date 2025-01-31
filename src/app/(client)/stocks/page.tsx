import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStocksCard from "@/components/stocks/page/HoldingStocksCard";
import StockTransactionsCard from "@/components/stocks/page/StockTransactionsCard";
import TradePerformancesCard from "@/components/stocks/page/TradePerformancesCard";
import DividendsCard from "@/components/stocks/page/DividendsCard";
import StockTransactionForm from "@/components/stocks/transactions/StockTransactionForm";
import DividendForm from "@/components/stocks/dividends/DividendForm";

export default async function StockPage() {
  return (
    <main className="grid h-[94vh] w-full grid-cols-3 gap-2 overflow-auto p-2">
      <Card>
        <CardContent></CardContent>
      </Card>
      <HoldingStocksCard className="col-span-2" />
      <StockTransactionsCard className="col-span-2" />
      <Card>
        <CardHeader>
          <CardTitle>Create new transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <StockTransactionForm />
        </CardContent>
      </Card>
      <TradePerformancesCard className="col-span-3" />
      <DividendsCard className="col-span-2" />
      <Card>
        <CardHeader>
          <CardTitle>Create new dividend record</CardTitle>
        </CardHeader>
        <CardContent>
          <DividendForm />
        </CardContent>
      </Card>
    </main>
  );
}
