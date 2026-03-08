export interface FeedbackEntry {
  id: string
  text: string
  source: string
  submittedAt: string
  userName: string
  screenshotUrl?: string
  sessionId?: string
  sentiment?: "positive" | "negative" | "neutral"
  groupId: string
}

export interface FeedbackGroup {
  id: string
  title: string
  summary: string
  severity: "critical" | "high" | "medium" | "low"
  entryCount: number
  categories: string[]
  aiSummary: {
    problem: string
    impact: string
    reproductionSteps: string[]
    suggestion: string
  }
  duplicateCount: number
  trendDirection: "up" | "down" | "stable"
  firstReported: string
  lastReported: string
}

export interface AnalyticsData {
  totalEntries: number
  totalGroups: number
  severityDistribution: { severity: string; count: number }[]
  categoryBreakdown: { category: string; count: number }[]
  volumeByDate: { date: string; count: number }[]
  topImpactedAreas: { area: string; groupCount: number }[]
}
