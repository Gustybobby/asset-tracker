import type { StockTransactionTableRow } from "@/lib/utils/stock/stock.util.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { cn } from "@/lib/utils";

const HIDDEN_PLACEHOLDER = "****";

export default function StockTransactionTable({
  transactions,
  amountVisible,
}: {
  transactions: StockTransactionTableRow[];
  amountVisible: boolean;
}) {
  return (
    <Table divClassName="h-96">
      <TableCaption>Your stock transactions</TableCaption>
      <TableHeader className="sticky top-0">
        <TableRow className="bg-muted hover:bg-muted">
          <TableHead>Submitted at</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Executed Price (USD)</TableHead>
          <TableHead>Shares</TableHead>
          <TableHead>Fee (USD)</TableHead>
          <TableHead>Total (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const cellStyle = cn(
            "font-bold",
            transaction.type === "BUY" && "text-green-500",
            transaction.type === "SELL" && "text-red-500",
            transaction.type === "SELL_ALL" && "text-red-600",
          );
          return (
            <TableRow key={transaction.id} className="hover:bg-inherit">
              <TableCell>{transaction.submittedAt}</TableCell>
              <TableCell>{transaction.stockId}</TableCell>
              <TableCell className={cellStyle}>
                {transaction.formattedType}
              </TableCell>
              <TableCell>
                {amountVisible ? transaction.executedPrice : HIDDEN_PLACEHOLDER}
              </TableCell>
              <TableCell>
                {amountVisible ? transaction.shares : HIDDEN_PLACEHOLDER}
              </TableCell>
              <TableCell>
                {amountVisible ? transaction.fee : HIDDEN_PLACEHOLDER}
              </TableCell>
              <TableCell className={cellStyle}>
                {amountVisible ? transaction.total : HIDDEN_PLACEHOLDER}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
