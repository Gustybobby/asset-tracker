"use client";

import type { StockTransactionTableRow } from "@/lib/utils/stock/stock.util.type";
import type { Dispatch, SetStateAction } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import StockTransactionTable from "../transactions/StockTransactionTable";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

interface StockTransactionsCardProps {
  className?: string;
  amountVisible: boolean;
  stockTransactions?: StockTransactionTableRow[];
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export default function StockTransactionsCard({
  className,
  amountVisible,
  stockTransactions,
  date,
  setDate,
}: StockTransactionsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Your transactions</CardTitle>
        <DateMonthFilter date={date} setDate={setDate} />
      </CardHeader>
      <CardContent>
        {stockTransactions ? (
          <StockTransactionTable
            transactions={stockTransactions}
            amountVisible={amountVisible}
          />
        ) : (
          <TableSkeleton colNums={7} rowNums={9} />
        )}
      </CardContent>
    </Card>
  );
}

function DateMonthFilter({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) {
  return (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{date.getMonth() + 1}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
            <DropdownMenuItem
              key={month}
              className={date.getMonth() + 1 === month ? "bg-accent" : ""}
              onClick={() =>
                setDate((date) => {
                  date.setMonth(month - 1);
                  return new Date(date);
                })
              }
            >
              {month}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{date.getFullYear()}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((yearDiff) => {
            const year = new Date().getFullYear() - yearDiff;
            return (
              <DropdownMenuItem
                key={year}
                className={date.getFullYear() === year ? "bg-accent" : ""}
                onClick={() =>
                  setDate((date) => {
                    date.setFullYear(year);
                    return new Date(date);
                  })
                }
              >
                {year}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
