import { AlertTriangle, TrendingUp, Copy, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { AnalyticsData, FeedbackGroup } from "@/lib/types"

interface InsightsRowProps {
  analytics: AnalyticsData | null
  groups: FeedbackGroup[]
}

export function InsightsRow({ analytics, groups }: InsightsRowProps) {
  if (!analytics || groups.length === 0) {
    return (
      <div className="flex gap-3 overflow-x-auto py-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-44 shrink-0 rounded-full" />
        ))}
      </div>
    )
  }

  const topArea = analytics.topImpactedAreas[0]?.area ?? "N/A"
  const trendingUpCount = groups.filter(
    (g) => g.trendDirection === "up"
  ).length
  const totalDuplicates = groups.reduce((s, g) => s + g.duplicateCount, 0)
  const criticalGroups = groups.filter(
    (g) => g.severity === "critical"
  ).length

  const insights = [
    {
      icon: Target,
      label: `Most Impacted: ${topArea}`,
      className:
        "border-blue-500/30 bg-blue-500/10 text-blue-400",
    },
    {
      icon: TrendingUp,
      label: `Trending Up: ${trendingUpCount} issues`,
      className:
        "border-amber-500/30 bg-amber-500/10 text-amber-400",
    },
    {
      icon: Copy,
      label: `${totalDuplicates} duplicates detected`,
      className:
        "border-blue-500/30 bg-blue-500/10 text-blue-400",
    },
    {
      icon: AlertTriangle,
      label: `${criticalGroups} critical issues need attention`,
      className:
        "border-red-500/30 bg-red-500/10 text-red-400",
    },
  ]

  return (
    <div className="flex gap-3 overflow-x-auto py-1">
      {insights.map((insight) => {
        const Icon = insight.icon
        return (
          <Badge
            key={insight.label}
            variant="outline"
            className={`shrink-0 gap-1.5 px-3 py-1 text-xs ${insight.className}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {insight.label}
          </Badge>
        )
      })}
    </div>
  )
}
