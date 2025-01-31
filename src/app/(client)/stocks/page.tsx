import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StockTransactionForm from "@/components/stocks/transactions/StockTransactionForm";
import TradePerformanceTable from "@/components/stocks/TradePerformanceTable";
import DividendForm from "@/components/stocks/dividends/DividendForm";
import DividendTable from "@/components/stocks/dividends/DividendTable";
import HoldingStocksCard from "@/components/stocks/page/HoldingStocksCard";
import StockTransactionsCard from "@/components/stocks/page/StockTransactionsCard";

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
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Your Trade Performances</CardTitle>
        </CardHeader>
        <CardContent>
          <TradePerformanceTable tradePerformances={[]} />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Dividend records</CardTitle>
        </CardHeader>
        <CardContent>
          <DividendTable dividends={[]} />
        </CardContent>
      </Card>
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
