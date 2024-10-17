"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartConfig = {
  high: {
    label: "Alta",
    color: "hsl(var(--destructive))",
  },
  medium: {
    label: "Media",
    color: "hsl(var(--warning))",
  },
  low: {
    label: "Baja",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

interface AlertPieChartProps {
  severityData: { name: string; value: number }[]
}

export function AlertPieChart({ severityData }: AlertPieChartProps) {
  const COLORS = [
    "hsl(var(--chart-6))", // Color para severidad alta
    "hsl(var(--chart-3))", // Color para severidad media
    "hsl(var(--chart-1))", // Color para severidad baja
  ]

  const totalAlerts = React.useMemo(() => {
    return severityData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  function getCurrentSemester(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    let semester: string

    if (month >= 1 && month <= 6) {
      semester = "Enero - Junio"
    } else {
      semester = "Julio - Diciembre"
    }

    return `${semester} ${year}`
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución de Alertas por Severidad</CardTitle>
        <CardDescription>{getCurrentSemester()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          {totalAlerts === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-center text-muted-foreground">
                No hay alertas registradas en este período
              </p>
            </div>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {severityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
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
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalAlerts.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Alertas
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-4">
        <div className="leading-none text-muted-foreground">
          Total de alertas por severidad de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
