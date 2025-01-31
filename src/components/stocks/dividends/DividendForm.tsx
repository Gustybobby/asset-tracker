"use client";

import { Dividend } from "@/server/infrastructure/models/dividend.model";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createDividend } from "@/server/controllers/stock.controller";

export const DividendFormSchema = Dividend.omit({
  id: true,
}).extend({
  stockId: z.string().min(1, "Required"),
  amount: z.coerce.number().gt(0, "Amount must be more than zero"),
  withHoldingTax: z.coerce
    .number()
    .min(0, "Withholding tax cannot be negative"),
});
export type DividendFormSchema = z.infer<typeof DividendFormSchema>;

export default function DividendForm() {
  const router = useRouter();
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  const form = useForm<DividendFormSchema>({
    resolver: zodResolver(DividendFormSchema),
    defaultValues: {
      stockId: "",
      amount: 0,
      withHoldingTax: 0,
      receivedAt: new Date(),
    },
  });

  async function onSubmit(data: DividendFormSchema) {
    try {
      setDisableSubmit(true);
      await createDividend({
        ...data,
        amount: String(data.amount),
        withHoldingTax: String(data.withHoldingTax),
      });
      router.refresh();
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="withHoldingTax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Withholding tax</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receivedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Received at</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={formatDate(field.value)}
                  type="datetime-local"
                  onChange={(e) =>
                    form.setValue("receivedAt", new Date(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex items-center justify-between">
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
