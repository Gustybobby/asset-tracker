import type {
  HoldingStockTableRow,
  HoldingStockTableSummary,
} from "@/lib/utils/stock/stock.util.type";
import type { CurrencyExchange } from "@/server/infrastructure/models/currency-exchange.model";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, Label, PieChart } from "recharts";

const COLORS = [
  "#8a3ffc",
  "#ff7eb6",
  "#6fdc8c",
  "#d2a106",
  "#ba4e00",
  "#33b1ff",
  "#fa4d56",
  "#4589ff",
  "#08bdba",
  "#d4bbff",
];

export default function HoldingStocksChart({
  holdingStocks,
  summary,
  currencyExchange,
  baseCurrency,
  amountVisible,
}: {
  holdingStocks: HoldingStockTableRow[];
  summary: HoldingStockTableSummary;
  currencyExchange: CurrencyExchange;
  baseCurrency: string;
  amountVisible: boolean;
}) {
  const chartConfig = useMemo(
    () => ({
      ...Object.fromEntries(
        holdingStocks.map((stock, idx) => [
          stock.id,
          { label: stock.id, color: COLORS[idx % COLORS.length] },
        ]),
      ),
    }),
    [holdingStocks],
  );

  const chartData = useMemo(
    () =>
      holdingStocks.map((stock) => ({
        id: stock.id,
        total: Number(stock.totalPrice),
        fill: `var(--color-${stock.id})`,
      })),
    [holdingStocks],
  );

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-96">
      <PieChart>
        {amountVisible && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
        )}
        <Pie
          data={chartData}
          dataKey="total"
          nameKey="id"
          innerRadius={80}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 12}
                      className="fill-foreground text-lg font-bold"
                    >
                      {amountVisible
                        ? Number(summary.totalHoldingPrices).toLocaleString()
                        : "****"}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 6}
                      className="fill-muted-foreground"
                    >
                      USD
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      ({" "}
                      {amountVisible
                        ? Number(
                            (
                              Number(summary.totalHoldingPrices) /
                              Number(currencyExchange.toUSD)
                            ).toFixed(2),
                          ).toLocaleString()
                        : "****"}{" "}
                      {baseCurrency} )
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
