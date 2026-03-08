import { createRequire } from "module";
import type { FeedbackEntry, FeedbackGroup } from "../types.js";

const require = createRequire(import.meta.url);
const seedEntries = require("./entries.json") as FeedbackEntry[];
const seedGroups = require("./groups.json") as FeedbackGroup[];

// Mutable in-memory store (spread seed data so originals are untouched)
export const entries: FeedbackEntry[] = [...seedEntries];
export const groups: FeedbackGroup[] = [...seedGroups];

// Race condition guard for AI pipeline
export let isProcessing = false;
export function setProcessing(value: boolean) {
  isProcessing = value;
}
