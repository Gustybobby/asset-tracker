import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HoldingStockTable from "@/components/stocks/HoldingStockTable";
import StockRepo from "@/server/infrastructure/repos/stock.repo";
import StockTransactionForm from "@/components/stocks/StockTransactionForm";
import StockTransactionTable from "@/components/stocks/StockTransactionTable";
import TradePerformanceTable from "@/components/stocks/TradePerformanceTable";
import StockDataService from "@/server/infrastructure/services/stock-data.service";
import StockPriceRepo from "@/server/infrastructure/repos/stock-price.repo";

export default async function StockPage() {
  const stockRepo = new StockRepo();
  const stockDataService = new StockDataService(new StockPriceRepo());
  const [holdingStocks, stockTransactions, tradePerformances] =
    await Promise.all([
      stockRepo.findHoldingStocks().then(async (holdingStocks) => {
        const date = getLatestWeekDayDate();
        const latestPrices = await Promise.all(
          holdingStocks.map(({ id }) =>
            stockDataService.getDailyStockData({ stockId: id, date }),
          ),
        );
        return holdingStocks.map((stock, idx) => ({
          ...stock,
          price: latestPrices[idx].close,
        }));
      }),
      stockRepo.findStockTransactions(),
      stockRepo.findTradePerformances(),
    ]);

  return (
    <main className="grid h-[94vh] w-full grid-cols-3 gap-2 overflow-auto p-2">
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

function getLatestWeekDayDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  while (date.getDay() == 0 || date.getDay() == 6) {
    date.setDate(date.getDate() - 1);
  }
  return date;
}
