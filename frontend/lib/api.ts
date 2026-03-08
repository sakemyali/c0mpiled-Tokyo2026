import type { FeedbackEntry, FeedbackGroup, AnalyticsData } from "./types";

export type { FeedbackEntry, FeedbackGroup, AnalyticsData };

export interface GroupDetail extends FeedbackGroup {
  entries: FeedbackEntry[];
}

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

async function postJSON<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export function fetchGroups(): Promise<FeedbackGroup[]> {
  return fetchJSON<FeedbackGroup[]>("/groups");
}

export function fetchGroup(id: string): Promise<GroupDetail> {
  return fetchJSON<GroupDetail>(`/groups/${id}`);
}

export function fetchAnalytics(): Promise<AnalyticsData> {
  return fetchJSON<AnalyticsData>("/analytics");
}

export function submitEntry(data: {
  text: string;
  source: string;
  userName: string;
}): Promise<FeedbackEntry> {
  return postJSON<FeedbackEntry>("/entries", data);
}

export function triggerAIProcessing(): Promise<{
  success: boolean;
  groupCount: number;
}> {
  return postJSON<{ success: boolean; groupCount: number }>("/ai");
}

export function fetchAIStatus(): Promise<{ isProcessing: boolean }> {
  return fetchJSON<{ isProcessing: boolean }>("/ai/status");
}
