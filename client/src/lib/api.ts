import type { FeedbackGroup, FeedbackEntry, AnalyticsData } from "./types"

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

export function fetchGroups(): Promise<FeedbackGroup[]> {
  return fetchJSON<FeedbackGroup[]>("/api/groups")
}

export function fetchGroup(
  id: string
): Promise<FeedbackGroup & { entries: FeedbackEntry[] }> {
  return fetchJSON<FeedbackGroup & { entries: FeedbackEntry[] }>(
    `/api/groups/${id}`
  )
}

export function fetchAnalytics(): Promise<AnalyticsData> {
  return fetchJSON<AnalyticsData>("/api/analytics")
}
