import type {
  HoldingStockTableRow,
  HoldingStockTableSummary,
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

export default function HoldingStockTable({
  holdingStocks,
  summary,
}: {
  holdingStocks: HoldingStockTableRow[];
  summary: HoldingStockTableSummary;
}) {
  return (
    <Table divClassName="h-80">
      <TableCaption>A list of your holding stocks</TableCaption>
      <TableHeader className="sticky top-0">
        <TableRow className="bg-muted hover:bg-muted">
          <TableHead>Stock</TableHead>
          <TableHead>Allocation</TableHead>
          <TableHead>Current price</TableHead>
          <TableHead>Shares</TableHead>
          <TableHead>Average price</TableHead>
          <TableHead>Gains</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdingStocks.map((stock) => (
          <TableRow key={stock.id} className="hover:bg-inherit">
            <TableCell className="font-bold">{stock.id}</TableCell>
            <TableCell>
              {stock.totalPrice} ({stock.allocation}%)
            </TableCell>
            <TableCell>{stock.price}</TableCell>
            <TableCell>{stock.holding}</TableCell>
            <TableCell>{stock.averagePrice}</TableCell>
            <TableCell
              className={cn(
                "font-bold",
                Number(stock.totalGain) >= 0
                  ? "text-green-500"
                  : "text-red-500",
              )}
            >
              {stock.totalGain} ({stock.totalGainPercent}%)
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-bold">Total</TableCell>
          <TableCell className="font-bold" colSpan={4}>
            {summary.totalHoldingPrices}
          </TableCell>
          <TableCell
            className={cn(
              "font-bold",
              Number(summary.totalHoldingGains) >= 0
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {summary.totalHoldingGains} ({summary.totalHoldingGainsPercent}%)
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
