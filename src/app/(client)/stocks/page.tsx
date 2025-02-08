"use client";

import { useAmountVisibility } from "@/hooks/stocks/use-amount-visibility";
import { useCurrencyExchange } from "@/hooks/currencies/use-currency-exchange";
import { useHoldingStocks } from "@/hooks/stocks/use-holding-stocks";
import { useStockTransactions } from "@/hooks/stocks/use-stock-transactions";
import { useBankAccounts } from "@/hooks/cash/use-bank-accounts";
import { useTradePerformances } from "@/hooks/stocks/use-trade-performances";
import { useDividends } from "@/hooks/stocks/use-dividends";
import HoldingStocksCard from "@/components/stocks/cards/HoldingStocksCard";
import StockTransactionsCard from "@/components/stocks/cards/StockTransactionsCard";
import TradePerformancesCard from "@/components/stocks/cards/TradePerformancesCard";
import DividendsCard from "@/components/stocks/cards/DividendsCard";
import StockTransactionFormCard from "@/components/stocks/cards/StockTransactionFormCard";
import DividendFormCard from "@/components/stocks/cards/DividendFormCard";
import HoldingStocksChartCard from "@/components/stocks/cards/HoldingStocksChartCard";

export default function StockPage() {
  const { visible: amountVisible } = useAmountVisibility();
  const { currencyExchange, baseCurrency } = useCurrencyExchange();
  const {
    holdingStocks,
    holdingStocksSummary,
    refetch: refetchHoldingStocks,
  } = useHoldingStocks();
  const {
    stockTransactions,
    refetch: refetchStockTransactions,
    date,
    setDate,
  } = useStockTransactions();
  const { bankAccounts, refetch: refetchBankAccounts } = useBankAccounts();
  const {
    tradePerformances,
    tradePerformancesSummary,
    refetch: refetchTradePerformances,
  } = useTradePerformances();
  const { dividends, refetch: refetchDividends } = useDividends();

  return (
    <main className="grid h-[94vh] w-full grid-cols-3 gap-2 overflow-auto p-2">
      <HoldingStocksChartCard
        amountVisible={amountVisible}
        holdingStocks={holdingStocks}
        holdingStocksSummary={holdingStocksSummary}
        currencyExchange={currencyExchange}
        baseCurrency={baseCurrency}
      />
      <HoldingStocksCard
        className="col-span-2"
        amountVisible={amountVisible}
        holdingStocks={holdingStocks}
        holdingStocksSummary={holdingStocksSummary}
      />
      <StockTransactionsCard
        className="col-span-2"
        amountVisible={amountVisible}
        stockTransactions={stockTransactions}
        date={date}
        setDate={setDate}
      />
      <StockTransactionFormCard
        bankAccounts={bankAccounts}
        onSuccessSubmit={() => {
          refetchHoldingStocks();
          refetchStockTransactions();
          refetchBankAccounts();
          refetchTradePerformances();
        }}
      />
      <TradePerformancesCard
        className="col-span-3"
        amountVisible={amountVisible}
        tradePerformances={tradePerformances}
        tradePerformancesSummary={tradePerformancesSummary}
      />
      <DividendsCard
        className="col-span-2"
        amountVisible={amountVisible}
        dividends={dividends}
      />
      <DividendFormCard onSuccessSubmit={() => refetchDividends()} />
    </main>
  );
}
