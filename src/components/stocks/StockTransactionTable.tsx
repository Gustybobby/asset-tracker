import type { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";
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

export default function StockTransactionTable({
  transactions,
}: {
  transactions: StockTransaction[];
}) {
  return (
    <Table>
      <TableCaption>Your stock transactions</TableCaption>
      <TableHeader>
        <TableRow>
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
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.submittedAt).toLocaleString("en-gb")}
              </TableCell>
              <TableCell>{transaction.stockId}</TableCell>
              <TableCell className={cellStyle}>
                {transaction.type.replace("_", " ")}
              </TableCell>
              <TableCell>
                {Number(transaction.executedPrice).toFixed(2)}
              </TableCell>
              <TableCell>{Number(transaction.shares).toFixed(8)}</TableCell>
              <TableCell>{transaction.fee}</TableCell>
              <TableCell className={cellStyle}>
                {Number(
                  Number(transaction.executedPrice) *
                    Number(transaction.shares) +
                    (transaction.type === "BUY"
                      ? +transaction.fee
                      : -transaction.fee),
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
