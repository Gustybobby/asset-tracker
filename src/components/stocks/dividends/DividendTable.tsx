import type { Dividend } from "@/server/infrastructure/models/dividend.model";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

export default function DividendTable({
  dividends,
}: {
  dividends: Dividend[];
}) {
  return (
    <Table divClassName="h-96">
      <TableCaption>Your dividends</TableCaption>
      <TableHeader className="sticky top-0">
        <TableRow className="bg-muted hover:bg-muted">
          <TableHead>Received at</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Amount (USD)</TableHead>
          <TableHead>Withholding tax (USD)</TableHead>
          <TableHead>Total (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dividends.map((dividend) => {
          return (
            <TableRow key={dividend.id} className="hover:bg-inherit">
              <TableCell>
                {new Date(dividend.receivedAt).toLocaleString("en-gb")}
              </TableCell>
              <TableCell>{dividend.stockId}</TableCell>
              <TableCell>{Number(dividend.amount).toFixed(2)}</TableCell>
              <TableCell>
                {Number(dividend.withHoldingTax).toFixed(2)}
              </TableCell>
              <TableCell>
                {(
                  Number(dividend.amount) - Number(dividend.withHoldingTax)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
