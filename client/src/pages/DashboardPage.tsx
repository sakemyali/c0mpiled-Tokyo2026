import { useEffect, useState } from "react"
import { StatsRow } from "@/components/dashboard/StatsRow"
import { InsightsRow } from "@/components/dashboard/InsightsRow"
import { CardGrid } from "@/components/dashboard/CardGrid"
import { DetailPanel } from "@/components/detail/DetailPanel"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { fetchGroups, fetchAnalytics } from "@/lib/api"
import type { FeedbackGroup, AnalyticsData } from "@/lib/types"

export function DashboardPage() {
  const [groups, setGroups] = useState<FeedbackGroup[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<FeedbackGroup | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [g, a] = await Promise.all([fetchGroups(), fetchAnalytics()])
        setGroups(g)
        setAnalytics(a)
      } catch (err) {
        console.error("Failed to load dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="container mx-auto space-y-6 px-6 py-6">
      {/* Stats Row -- top ~15-20% of viewport */}
      <StatsRow analytics={analytics} />

      {/* PM Insights Row */}
      <InsightsRow analytics={analytics} groups={groups} />

      {/* Section heading for card grid */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">
          Feedback Groups
        </h2>
        <span className="text-sm text-muted-foreground tabular-nums">
          {loading ? "Loading..." : `${groups.length} groups`}
        </span>
      </div>

      {/* 2-column card grid */}
      <CardGrid groups={groups} onSelectGroup={setSelectedGroup} />

      {/* Slide-in detail panel */}
      <Sheet
        open={!!selectedGroup}
        onOpenChange={(open) => { if (!open) setSelectedGroup(null) }}
      >
        <SheetContent
          side="right"
          className="w-[60vw] sm:max-w-none p-0 border-l border-white/10"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{selectedGroup?.title ?? "Group Details"}</SheetTitle>
            <SheetDescription>Detail view for the selected feedback group</SheetDescription>
          </SheetHeader>
          {selectedGroup && <DetailPanel group={selectedGroup} />}
        </SheetContent>
      </Sheet>
    </div>
  )
}
