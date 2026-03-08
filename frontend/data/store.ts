import type { FeedbackEntry, FeedbackGroup } from "@/lib/types";
import seedEntries from "./entries.json";
import seedGroups from "./groups.json";

// Mutable in-memory store (resets on server restart)
export const entries: FeedbackEntry[] = [...(seedEntries as FeedbackEntry[])];
export const groups: FeedbackGroup[] = [...(seedGroups as FeedbackGroup[])];

export let isProcessing = false;
export function setProcessing(value: boolean) {
  isProcessing = value;
}
