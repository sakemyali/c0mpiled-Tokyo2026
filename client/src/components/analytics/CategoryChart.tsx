import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryChartProps {
  data: { category: string; count: number }[]
}

const chartConfig: ChartConfig = {
  count: { label: "Count", color: "oklch(0.7 0.18 200)" },
}

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-md border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.05)" />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              width={120}
            />
            <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
