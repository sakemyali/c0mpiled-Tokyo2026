import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { SummaryView } from "./SummaryView"
import { EntryList } from "./EntryList"
import { ScreenshotLightbox } from "./ScreenshotLightbox"
import { fetchGroup } from "@/lib/api"
import { severityConfig } from "@/lib/severity"
import type { FeedbackGroup, FeedbackEntry } from "@/lib/types"

interface DetailPanelProps {
  group: FeedbackGroup
}

export function DetailPanel({ group }: DetailPanelProps) {
  const [entries, setEntries] = useState<FeedbackEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchGroup(group.id)
      .then((data) => {
        if (!cancelled) setEntries(data.entries)
      })
      .catch((err) => console.error("Failed to fetch group details:", err))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [group.id])

  const sev = severityConfig[group.severity]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold tracking-tight">{group.title}</h2>
          <Badge variant="outline" className={sev.color}>
            {group.severity}
          </Badge>
          <span className="text-sm text-muted-foreground tabular-nums">
            {group.entryCount} entries
          </span>
        </div>
      </div>

      {/* Split content */}
      <div className="flex flex-1 min-h-0">
        {/* Left: AI Summary (~45%) */}
        <div className="w-[45%] border-r border-white/10 p-6 overflow-y-auto">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            AI Analysis
          </h3>
          <SummaryView aiSummary={group.aiSummary} severity={group.severity} />
        </div>

        {/* Right: Entries (~55%) */}
        <div className="w-[55%] p-6 flex flex-col min-h-0">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <EntryList
              entries={entries}
              onScreenshotClick={setLightboxImage}
            />
          )}
        </div>
      </div>

      <ScreenshotLightbox
        imageUrl={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  )
}
