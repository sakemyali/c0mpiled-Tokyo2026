import { Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { FeedbackEntry } from "@/lib/types"

interface EntryCardProps {
  entry: FeedbackEntry
  onScreenshotClick: (url: string) => void
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const days = Math.floor(diffMs / 86_400_000)
  if (days < 1) return "today"
  if (days === 1) return "1 day ago"
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? "1 month ago" : `${months} months ago`
}

const sentimentDot: Record<string, string> = {
  positive: "bg-green-500",
  negative: "bg-red-500",
  neutral: "bg-gray-400",
}

export function EntryCard({ entry, onScreenshotClick }: EntryCardProps) {
  return (
    <div className="rounded-lg bg-card/50 backdrop-blur-sm border border-white/10 p-3 space-y-2">
      <p className="text-sm text-foreground/90 leading-relaxed">{entry.text}</p>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {entry.sentiment && (
            <span className={`inline-block h-2 w-2 rounded-full ${sentimentDot[entry.sentiment] ?? sentimentDot.neutral}`} />
          )}
          <span className="font-medium text-foreground/70">{entry.userName}</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {entry.source}
          </Badge>
          <span>{timeAgo(entry.submittedAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          {entry.sessionId && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1 text-muted-foreground">
              <Video className="h-3 w-3" />
              Session recorded
            </Badge>
          )}
          {entry.screenshotUrl && (
            <button
              type="button"
              onClick={() => onScreenshotClick(entry.screenshotUrl!)}
              className="rounded border border-white/10 overflow-hidden hover:border-white/30 transition-colors"
            >
              <img
                src={entry.screenshotUrl}
                alt="Screenshot"
                className="h-9 w-12 object-cover"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
