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

const HIDDEN_PLACEHOLDER = "****";

export default function DividendTable({
  dividends,
  amountVisible,
}: {
  dividends: Dividend[];
  amountVisible: boolean;
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
              <TableCell>
                {amountVisible
                  ? Number(dividend.amount).toFixed(2)
                  : HIDDEN_PLACEHOLDER}
              </TableCell>
              <TableCell>
                {amountVisible
                  ? Number(dividend.withHoldingTax).toFixed(2)
                  : HIDDEN_PLACEHOLDER}
              </TableCell>
              <TableCell>
                {amountVisible
                  ? (
                      Number(dividend.amount) - Number(dividend.withHoldingTax)
                    ).toFixed(2)
                  : HIDDEN_PLACEHOLDER}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
