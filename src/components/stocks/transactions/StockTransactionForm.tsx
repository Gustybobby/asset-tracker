"use client";

import { StockTransaction } from "@/server/infrastructure/models/stock-transaction.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { useState } from "react";
import { createStockTransaction } from "@/server/controllers/stock.controller";

const StockTransactionFormSchema = StockTransaction.omit({ id: true }).extend({
  stockId: z.string().min(1, "Required"),
  executedPrice: z.coerce.number().min(0, "Executed price cannot be negative"),
  shares: z.coerce.number(),
  fee: z.coerce.number().min(0, "Fee cannot be negative"),
});
type StockTransactionFormSchema = z.infer<typeof StockTransactionFormSchema>;

export default function StockTransactionForm({
  onSuccessSubmit,
}: {
  onSuccessSubmit?: () => void;
}) {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  const form = useForm<StockTransactionFormSchema>({
    resolver: zodResolver(StockTransactionFormSchema),
    defaultValues: {
      stockId: "",
      executedPrice: 0,
      shares: 0,
      fee: 0,
      submittedAt: new Date(),
    },
  });

  async function onSubmit(data: StockTransactionFormSchema) {
    try {
      setDisableSubmit(true);
      await createStockTransaction({
        ...data,
        executedPrice: String(data.executedPrice),
        shares: String(data.shares),
        fee: String(data.fee),
      });
      onSuccessSubmit?.();
    } catch (error) {
      console.error(error);
    }
    setDisableSubmit(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="stockId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BUY">Buy</SelectItem>
                  <SelectItem value="SELL">Sell</SelectItem>
                  <SelectItem value="SELL_ALL">Sell all</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="executedPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Executed price</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shares</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="submittedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submitted at</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={formatDate(field.value)}
                  type="datetime-local"
                  onChange={(e) =>
                    form.setValue("submittedAt", new Date(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex items-center justify-between">
          <span className="text-sm">
            Total {"≈"}{" "}
            {(
              Number(form.watch("executedPrice")) *
                Number(form.watch("shares")) +
              (form.watch("type") === "BUY" ? 1 : -1) *
                Number(form.watch("fee"))
            ).toFixed(2)}{" "}
            USD
          </span>
          <Button type="submit" disabled={disableSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

const formatDate = (date?: Date): string | undefined => {
  if (!date) {
    return undefined;
  }
  const dateString = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
  const timeString = [
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0"),
  ].join(":");
  return [dateString, timeString].join("T");
};
