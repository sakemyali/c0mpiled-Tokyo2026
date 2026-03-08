import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { SeverityChart } from "@/components/analytics/SeverityChart"
import { VolumeChart } from "@/components/analytics/VolumeChart"
import { CategoryChart } from "@/components/analytics/CategoryChart"
import { TopImpactTable } from "@/components/analytics/TopImpactTable"
import { fetchAnalytics } from "@/lib/api"
import type { AnalyticsData } from "@/lib/types"

export function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
      .then(setAnalytics)
      .catch((err) => console.error("Failed to load analytics:", err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-[350px]" />
          <Skeleton className="h-[350px]" />
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="container mx-auto px-6 py-12 text-center text-muted-foreground">
        Failed to load analytics data.
      </div>
    )
  }

  const criticalCount =
    analytics.severityDistribution.find((s) => s.severity === "critical")?.count ?? 0

  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>

      {/* Summary stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-md border-white/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Entries</p>
            <p className="text-3xl font-bold tabular-nums">{analytics.totalEntries}</p>
            <p className="text-xs text-muted-foreground mt-1">
              across all feedback sources
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-md border-white/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Feedback Groups</p>
            <p className="text-3xl font-bold tabular-nums">{analytics.totalGroups}</p>
            <p className="text-xs text-muted-foreground mt-1">
              AI-clustered from raw feedback
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-md border-white/10">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Critical Issues</p>
            <p className="text-3xl font-bold tabular-nums text-red-400">{criticalCount}</p>
            <p className="text-xs text-muted-foreground mt-1">
              requiring immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SeverityChart data={analytics.severityDistribution} />
        <VolumeChart data={analytics.volumeByDate} />
      </div>

      {/* Bottom charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryChart data={analytics.categoryBreakdown} />
        <TopImpactTable data={analytics.topImpactedAreas} />
      </div>
    </div>
  )
}
