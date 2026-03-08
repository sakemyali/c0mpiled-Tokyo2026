import { GroupCard } from "./GroupCard"
import type { FeedbackGroup } from "@/lib/types"

interface CardGridProps {
  groups: FeedbackGroup[]
  onSelectGroup: (group: FeedbackGroup) => void
}

export function CardGrid({ groups, onSelectGroup }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} onClick={onSelectGroup} />
      ))}
    </div>
  )
}
