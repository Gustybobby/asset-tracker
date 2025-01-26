import { Stock } from "@/server/infrastructure/models/stock.model";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function HoldingStockList({
  holdingStocks,
}: {
  holdingStocks: Stock[];
}) {
  return (
    <Table>
      <TableCaption>A list of your holding stocks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Stock</TableHead>
          <TableHead>Holding</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdingStocks.map((stock) => (
          <TableRow>
            <TableCell>{stock.id}</TableCell>
            <TableCell>{stock.holding} shares</TableCell>
            <TableCell>
              {new Date(stock.updatedAt).toLocaleString("en-gb")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
