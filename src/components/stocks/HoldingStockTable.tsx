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

export default function HoldingStockTable({
  holdingStocks,
}: {
  holdingStocks: Stock[];
}) {
  return (
    <Table divClassName="h-80">
      <TableCaption>A list of your holding stocks</TableCaption>
      <TableHeader className="sticky top-0">
        <TableRow className="bg-muted hover:bg-muted">
          <TableHead>Stock</TableHead>
          <TableHead>Holding</TableHead>
          <TableHead>Average price</TableHead>
          <TableHead>Updated at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdingStocks.map((stock) => (
          <TableRow key={stock.id} className="hover:bg-inherit">
            <TableCell className="font-bold">{stock.id}</TableCell>
            <TableCell>{stock.holding} shares</TableCell>
            <TableCell>{Number(stock.averagePrice).toFixed(2)}</TableCell>
            <TableCell>
              {new Date(stock.updatedAt).toLocaleString("en-gb")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
