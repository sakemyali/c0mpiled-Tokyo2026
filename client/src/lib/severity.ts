export const severityConfig = {
  critical: {
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    dot: "bg-red-500",
    chart: "oklch(0.637 0.237 25.331)",
  },
  high: {
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    dot: "bg-orange-500",
    chart: "oklch(0.705 0.191 47.604)",
  },
  medium: {
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    dot: "bg-yellow-500",
    chart: "oklch(0.795 0.184 86.047)",
  },
  low: {
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    dot: "bg-green-500",
    chart: "oklch(0.723 0.191 149.579)",
  },
} as const

export type Severity = keyof typeof severityConfig
