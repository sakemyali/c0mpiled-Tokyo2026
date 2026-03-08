import { AlertCircle, Users, ListOrdered, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { severityConfig, type Severity } from "@/lib/severity"
import type { FeedbackGroup } from "@/lib/types"

interface SummaryViewProps {
  aiSummary: FeedbackGroup["aiSummary"]
  severity: Severity
}

const sections = [
  { key: "problem" as const, label: "Problem", icon: AlertCircle },
  { key: "impact" as const, label: "Impact", icon: Users },
  { key: "steps" as const, label: "Reproduction Steps", icon: ListOrdered },
  { key: "suggestion" as const, label: "Improvement Suggestion", icon: Lightbulb },
]

export function SummaryView({ aiSummary, severity }: SummaryViewProps) {
  const sev = severityConfig[severity]

  return (
    <div className="space-y-4">
      <Badge variant="outline" className={sev.color}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
      </Badge>

      <div className="space-y-3">
        {sections.map((section, i) => {
          const Icon = section.icon
          return (
            <div key={section.key}>
              {i > 0 && <Separator className="mb-3 opacity-30" />}
              <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm border border-white/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {section.label}
                  </span>
                </div>
                {section.key === "steps" ? (
                  <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/90">
                    {aiSummary.reproductionSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-foreground/90">
                    {section.key === "problem"
                      ? aiSummary.problem
                      : section.key === "impact"
                        ? aiSummary.impact
                        : aiSummary.suggestion}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
