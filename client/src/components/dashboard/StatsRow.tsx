import { Area, AreaChart, Cell, Pie, PieChart } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { severityConfig } from "@/lib/severity"
import type { AnalyticsData } from "@/lib/types"

interface StatsRowProps {
  analytics: AnalyticsData | null
}

export function StatsRow({ analytics }: StatsRowProps) {
  if (!analytics) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="border-white/10 bg-card/50 backdrop-blur-md"
          >
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const criticalCount =
    analytics.severityDistribution.find((s) => s.severity === "critical")
      ?.count ?? 0

  const categoryCount = analytics.categoryBreakdown.length

  const sevColors = analytics.severityDistribution.map((s) => {
    const key = s.severity as keyof typeof severityConfig
    return severityConfig[key]?.chart ?? "oklch(0.5 0 0)"
  })

  const stats = [
    {
      label: "Total Feedback",
      value: analytics.totalEntries,
      chart: (
        <ChartContainer
          config={{ volume: { color: "var(--chart-1)" } }}
          className="h-[40px] w-full"
        >
          <AreaChart data={analytics.volumeByDate}>
            <defs>
              <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-volume)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-volume)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="count"
              stroke="var(--color-volume)"
              fill="url(#volGrad)"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      ),
    },
    {
      label: "Issue Groups",
      value: analytics.totalGroups,
      chart: (
        <div className="flex h-[40px] items-center justify-center">
          <span className="text-xs text-muted-foreground">
            grouped by AI
          </span>
        </div>
      ),
    },
    {
      label: "Critical Issues",
      value: criticalCount,
      chart: (
        <ChartContainer
          config={{
            severity: { color: severityConfig.critical.chart },
          }}
          className="h-[40px] w-[60px] mx-auto"
        >
          <PieChart>
            <Pie
              data={analytics.severityDistribution}
              dataKey="count"
              nameKey="severity"
              innerRadius={10}
              outerRadius={18}
              strokeWidth={0}
              isAnimationActive={false}
            >
              {analytics.severityDistribution.map((_, idx) => (
                <Cell key={idx} fill={sevColors[idx]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      ),
    },
    {
      label: "Categories Tracked",
      value: categoryCount,
      chart: (
        <div className="flex h-[40px] items-center justify-center gap-1">
          {analytics.categoryBreakdown.slice(0, 4).map((c, i) => (
            <div
              key={i}
              className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] text-primary"
            >
              {c.category.length > 8
                ? c.category.slice(0, 8) + "..."
                : c.category}
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-white/10 bg-card/50 backdrop-blur-md"
        >
          <CardContent className="space-y-1">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            {stat.chart}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
