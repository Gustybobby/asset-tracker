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
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {new Date(transaction.submittedAt).toLocaleString("en-gb")}
            </TableCell>
            <TableCell>{transaction.stockId}</TableCell>
            <TableCell>{transaction.type.replace("_", " ")}</TableCell>
            <TableCell>{transaction.executedPrice}</TableCell>
            <TableCell>{transaction.shares}</TableCell>
            <TableCell>{transaction.fee}</TableCell>
            <TableCell>
              {Number(transaction.executedPrice) * Number(transaction.shares) +
                (transaction.type === "BUY"
                  ? +transaction.fee
                  : -transaction.fee)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
