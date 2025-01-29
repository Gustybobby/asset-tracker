import type { TradePerformance } from "@/server/interfaces/infrastructure/repos/stock.repo.interface";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

export default function TradePerformanceTable({
  tradePerformances,
}: {
  tradePerformances: TradePerformance[];
}) {
  const capitalizedProfitNoFee = tradePerformances
    .map((stock) => (Number(stock.holding) > 0 ? 0 : Number(stock.profit)))
    .reduce((cum, curr) => cum + curr, 0);
  const capitalizedProfit = tradePerformances
    .map((stock) =>
      Number(stock.holding) > 0
        ? 0
        : Number(stock.profit) - Number(stock.totalFee),
    )
    .reduce((cum, curr) => cum + curr, 0);
  const totalFee = tradePerformances
    .map((stock) => (Number(stock.holding) > 0 ? 0 : Number(stock.totalFee)))
    .reduce((cum, curr) => cum + curr, 0);
  return (
    <Table>
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
        {tradePerformances.map((stock) => {
          const isHolding = Number(stock.holding) > 0;
          const isProfit = Number(stock.profit) > 0;
          const isProfitWithFee =
            Number(stock.profit) - Number(stock.totalFee) > 0;

          return (
            <TableRow key={stock.stockId} className="hover:bg-inherit">
              <TableCell className="font-bold">{stock.stockId}</TableCell>
              <TableCell>
                {isHolding ? `${stock.holding} shares` : "No longer holds"}
              </TableCell>
              <TableCell
                className={cn(
                  "font-bold",
                  isHolding
                    ? "text-yellow-500"
                    : isProfit
                      ? "text-green-500"
                      : "text-red-500",
                )}
              >
                {isProfit && "+"}
                {Number(stock.profit).toFixed(2)} {isHolding && "(?)"}
              </TableCell>
              <TableCell>{Number(stock.totalFee).toFixed(2)}</TableCell>
              <TableCell
                className={cn(
                  "font-bold",
                  isHolding
                    ? "text-yellow-500"
                    : isProfitWithFee
                      ? "text-green-500"
                      : "text-red-500",
                )}
              >
                {isProfitWithFee && "+"}
                {(Number(stock.profit) - Number(stock.totalFee)).toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="font-bold">
            Capitalized profit
          </TableCell>
          <TableCell
            className={cn(
              "font-bold",
              capitalizedProfitNoFee >= 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {capitalizedProfitNoFee.toFixed(2)}
          </TableCell>
          <TableCell className="font-bold">{totalFee.toFixed(2)}</TableCell>
          <TableCell
            className={cn(
              "font-bold",
              capitalizedProfit >= 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {capitalizedProfit.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
