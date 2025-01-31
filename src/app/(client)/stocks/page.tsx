import HoldingStocksCard from "@/components/stocks/cards/HoldingStocksCard";
import StockTransactionsCard from "@/components/stocks/cards/StockTransactionsCard";
import TradePerformancesCard from "@/components/stocks/cards/TradePerformancesCard";
import DividendsCard from "@/components/stocks/cards/DividendsCard";
import StockTransactionFormCard from "@/components/stocks/cards/StockTransactionFormCard";
import DividendFormCard from "@/components/stocks/cards/DividendFormCard";
import HoldingStocksChartCard from "@/components/stocks/cards/HoldingStocksChartCard";

export default function StockPage() {
  return (
    <main className="grid h-[94vh] w-full grid-cols-3 gap-2 overflow-auto p-2">
      <HoldingStocksChartCard />
      <HoldingStocksCard className="col-span-2" />
      <StockTransactionsCard className="col-span-2" />
      <StockTransactionFormCard />
      <TradePerformancesCard className="col-span-3" />
      <DividendsCard className="col-span-2" />
      <DividendFormCard />
    </main>
  );
}
