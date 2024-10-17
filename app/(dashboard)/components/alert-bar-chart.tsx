"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarAlertData } from "@/types"

export const description = "An interactive bar chart"

const chartConfig = {
  alerts: {
    label: "Alertas",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface AlertBarChartProps {
  data: BarAlertData[]
  totalAlerts: number
}

export function AlertBarChart({ totalAlerts, data }: AlertBarChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 bg-muted/30">
          <CardTitle>Total de Alertas</CardTitle>
          <CardDescription>
            Alertas totales generadas a lo largo del año
          </CardDescription>
        </div>
        <div className="flex">
          <button
            data-active={true}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig.alerts.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {totalAlerts.toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 bg-muted/35 dark:bg-muted/20">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="alertas"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar radius={5} dataKey="alerts" fill={chartConfig.alerts.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
