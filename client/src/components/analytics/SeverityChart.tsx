import { PieChart, Pie, Cell, Label } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { severityConfig } from "@/lib/severity"

interface SeverityChartProps {
  data: { severity: string; count: number }[]
}

const chartConfig: ChartConfig = {
  critical: { label: "Critical", color: severityConfig.critical.chart },
  high: { label: "High", color: severityConfig.high.chart },
  medium: { label: "Medium", color: severityConfig.medium.chart },
  low: { label: "Low", color: severityConfig.low.chart },
}

export function SeverityChart({ data }: SeverityChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <Card className="bg-card/50 backdrop-blur-md border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Severity Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="severity" />} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="severity"
              innerRadius={70}
              outerRadius={110}
              strokeWidth={2}
              stroke="transparent"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.severity}
                  fill={`var(--color-${entry.severity})`}
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
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          total
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="severity" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
