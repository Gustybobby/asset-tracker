import type { Stock } from "@/server/infrastructure/models/stock.model";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

interface StockWithPrice extends Stock {
  price: string | null;
}

export default function HoldingStockTable({
  holdingStocks,
}: {
  holdingStocks: StockWithPrice[];
}) {
  const totalHoldingPrices = holdingStocks
    .map(({ price, holding }) => Number(price) * Number(holding))
    .reduce((cum, curr) => cum + curr, 0);
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
        {holdingStocks
          .toSorted(
            (a, b) =>
              -(
                Number(a.price) * Number(a.holding) -
                Number(b.price) * Number(b.holding)
              ),
          )
          .map((stock) => {
            const totalPrice = Number(stock.price) * Number(stock.holding);
            const allocation = (totalPrice / totalHoldingPrices) * 100;
            const totalGain =
              (Number(stock.price) - Number(stock.averagePrice)) *
              Number(stock.holding);
            return (
              <TableRow key={stock.id} className="hover:bg-inherit">
                <TableCell className="font-bold">{stock.id}</TableCell>
                <TableCell>
                  {totalPrice.toFixed(2)} ({allocation.toFixed(2)}%)
                </TableCell>
                <TableCell>{stock.price}</TableCell>
                <TableCell>{Number(stock.holding).toFixed(4)}</TableCell>
                <TableCell>{Number(stock.averagePrice).toFixed(2)}</TableCell>
                <TableCell
                  className={cn(
                    "font-bold",
                    totalGain >= 0 ? "text-green-500" : "text-red-500",
                  )}
                >
                  {totalGain > 0 && "+"}
                  {totalGain.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
