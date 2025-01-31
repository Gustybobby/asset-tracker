import type {
  TradePerformanceTableRow,
  TradePerformanceTableSummary,
} from "@/lib/utils/stock/stock.util.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { cn } from "@/lib/utils";

const HIDDEN_PLACEHOLDER = "****";

export default function TradePerformanceTable({
  tradePerformances,
  summary,
  amountVisible,
}: {
  tradePerformances: TradePerformanceTableRow[];
  summary: TradePerformanceTableSummary;
  amountVisible: boolean;
}) {
  return (
    <Table divClassName="h-[32rem]">
      <TableCaption>Your individual stock trade performances</TableCaption>
      <TableHeader className="sticky top-0">
        <TableRow className="bg-muted hover:bg-muted">
          <TableHead>Stock</TableHead>
          <TableHead>Holding</TableHead>
          <TableHead>Profit</TableHead>
          <TableHead>Total fee</TableHead>
          <TableHead>Profit (with fee)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tradePerformances.map((stock) => (
          <TableRow key={stock.stockId} className="hover:bg-inherit">
            <TableCell className="font-bold">{stock.stockId}</TableCell>
            <TableCell>
              {amountVisible || !stock.isHolding
                ? stock.holding
                : HIDDEN_PLACEHOLDER}
            </TableCell>
            <TableCell
              className={cn(
                "font-bold",
                stock.isHolding
                  ? "text-yellow-500"
                  : stock.isProfit
                    ? "text-green-500"
                    : "text-red-500",
              )}
            >
              {amountVisible ? stock.profit : HIDDEN_PLACEHOLDER}
            </TableCell>
            <TableCell>
              {amountVisible ? stock.totalFee : HIDDEN_PLACEHOLDER}
            </TableCell>
            <TableCell
              className={cn(
                "font-bold",
                stock.isHolding
                  ? "text-yellow-500"
                  : stock.isProfitWithFee
                    ? "text-green-500"
                    : "text-red-500",
              )}
            >
              {amountVisible ? stock.profitWithFee : HIDDEN_PLACEHOLDER}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="font-bold">
            Capitalized profit
          </TableCell>
          <TableCell
            className={cn(
              "font-bold",
              Number(summary.capitalizedProfitNoFee) >= 0
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {amountVisible
              ? summary.capitalizedProfitNoFee
              : HIDDEN_PLACEHOLDER}
          </TableCell>
          <TableCell className="font-bold">
            {amountVisible ? summary.totalFee : HIDDEN_PLACEHOLDER}
          </TableCell>
          <TableCell
            className={cn(
              "font-bold",
              Number(summary.capitalizedProfit) >= 0
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {amountVisible ? summary.capitalizedProfit : HIDDEN_PLACEHOLDER}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
