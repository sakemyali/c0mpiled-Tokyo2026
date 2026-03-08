import type { FeedbackGroup, FeedbackEntry, AnalyticsData } from "./types"

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

async function postJSON<T>(url: string, body?: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })
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

export function submitEntry(data: {
  text: string
  source: string
  userName: string
}): Promise<FeedbackEntry> {
  return postJSON<FeedbackEntry>("/api/entries", data)
}

export function triggerAIProcessing(): Promise<{
  success: boolean
  groupCount: number
}> {
  return postJSON<{ success: boolean; groupCount: number }>("/api/ai/process")
}

export function fetchAIStatus(): Promise<{ isProcessing: boolean }> {
  return fetchJSON<{ isProcessing: boolean }>("/api/ai/status")
}
