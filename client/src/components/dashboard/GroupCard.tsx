import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { severityConfig, type Severity } from "@/lib/severity"
import type { FeedbackGroup } from "@/lib/types"

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
} as const

interface GroupCardProps {
  group: FeedbackGroup
  onClick: (group: FeedbackGroup) => void
}

export function GroupCard({ group, onClick }: GroupCardProps) {
  const severity = severityConfig[group.severity as Severity]
  const TrendIcon = trendIcons[group.trendDirection]

  return (
    <Card
      className="cursor-pointer border-white/10 bg-card/50 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl"
      onClick={() => onClick(group)}
    >
      <CardContent className="space-y-3">
        {/* Header: title + severity + trend */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-semibold leading-tight">
            {group.title}
          </h3>
          <div className="flex shrink-0 items-center gap-1.5">
            <TrendIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <Badge className={severity.color} variant="outline">
              <span
                className={`mr-1 inline-block h-2 w-2 rounded-full ${severity.dot}`}
              />
              {group.severity}
            </Badge>
          </div>
        </div>

        {/* Summary snippet */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {group.summary}
        </p>

        {/* Footer: entry count + categories */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="shrink-0 tabular-nums">
            {group.entryCount} entries
          </Badge>
          <div className="flex flex-wrap justify-end gap-1">
            {group.categories.slice(0, 3).map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="border-white/10 bg-white/5 text-xs"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
