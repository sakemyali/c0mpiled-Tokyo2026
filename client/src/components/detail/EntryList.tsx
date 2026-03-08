import { ScrollArea } from "@/components/ui/scroll-area"
import { EntryCard } from "./EntryCard"
import type { FeedbackEntry } from "@/lib/types"

interface EntryListProps {
  entries: FeedbackEntry[]
  onScreenshotClick: (url: string) => void
}

export function EntryList({ entries, onScreenshotClick }: EntryListProps) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        {entries.length} feedback {entries.length === 1 ? "entry" : "entries"}
      </h3>
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-3">
          {sorted.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onScreenshotClick={onScreenshotClick}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
