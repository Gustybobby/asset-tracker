import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transformStockTransationTableRows } from "@/lib/utils/stock/stock.util";
import StockRepo from "@/server/infrastructure/repos/stock.repo";
import StockTransactionForm from "@/components/stocks/transactions/StockTransactionForm";
import StockTransactionTable from "@/components/stocks/transactions/StockTransactionTable";
import TradePerformanceTable from "@/components/stocks/TradePerformanceTable";
import DividendForm from "@/components/stocks/dividends/DividendForm";
import DividendTable from "@/components/stocks/dividends/DividendTable";
import DividendRepo from "@/server/infrastructure/repos/dividend.repo";
import HoldingStocksCard from "@/components/stocks/page/HoldingStockCard";

export default async function StockPage() {
  const stockRepo = new StockRepo();
  const dividendRepo = new DividendRepo();
  const [stockTransactions, tradePerformances, dividends] = await Promise.all([
    stockRepo.findStockTransactions(),
    stockRepo.findTradePerformances(),
    dividendRepo.findDividends(),
  ]);

  return (
    <main className="grid h-[94vh] w-full grid-cols-3 gap-2 overflow-auto p-2">
      <Card>
        <CardContent></CardContent>
      </Card>
      <HoldingStocksCard className="col-span-2" />
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Your transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <StockTransactionTable
            transactions={transformStockTransationTableRows(stockTransactions)}
          />
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
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Your Trade Performances</CardTitle>
        </CardHeader>
        <CardContent>
          <TradePerformanceTable tradePerformances={tradePerformances} />
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Dividend records</CardTitle>
        </CardHeader>
        <CardContent>
          <DividendTable dividends={dividends} />
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
