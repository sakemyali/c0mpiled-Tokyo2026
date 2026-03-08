---
phase: 02-ai-pipeline-live-input
plan: "01"
subsystem: backend-ai
tags: [ai-pipeline, openai, entries, store, backend]
dependency_graph:
  requires: [01-01]
  provides: [mutable-store, entries-api, ai-pipeline-api]
  affects: [groups-routes, analytics-routes]
tech_stack:
  added: [openai]
  patterns: [two-step-ai-pipeline, in-memory-mutable-store, parallel-summarization]
key_files:
  created:
    - server/src/data/store.ts
    - server/src/routes/entries.ts
    - server/src/services/ai-pipeline.ts
    - server/src/routes/ai.ts
  modified:
    - server/src/routes/groups.ts
    - server/src/routes/analytics.ts
    - server/src/index.ts
    - server/package.json
decisions:
  - "Export setProcessing function instead of mutable let for isProcessing flag"
  - "Fallback summaries if individual group summarization fails (graceful degradation)"
  - "gpt-4o-mini with temperature 0.3 for both clustering and summarization"
metrics:
  duration: 2 min
  completed: "2026-03-08T07:16:16Z"
---

# Phase 02 Plan 01: Backend AI Pipeline + Live Input Summary

Mutable in-memory store replacing static JSON imports, entry submission endpoint, and two-step OpenAI pipeline (cluster all entries then parallel-summarize per group)

## Task Results

| # | Task | Commit | Key Files |
|---|------|--------|-----------|
| 1 | Create in-memory store and refactor existing routes | f5300c0 | store.ts, groups.ts, analytics.ts |
| 2 | Add entry submission, AI pipeline, and processing endpoints | 5105ad3 | entries.ts, ai-pipeline.ts, ai.ts, index.ts |

## What Was Built

1. **In-memory store** (`store.ts`): Mutable arrays initialized from seed JSON via spread. Exports `entries`, `groups`, `isProcessing`, and `setProcessing`. All existing routes now read from the same mutable arrays.

2. **Entry submission** (`entries.ts`): POST /api/entries accepts `{text, source, userName}`, validates all fields, creates entry with UUID-based ID and `groupId: "ungrouped"`. GET /api/entries/ungrouped returns unassigned entries.

3. **AI pipeline service** (`ai-pipeline.ts`): Two-step OpenAI process:
   - Step 1: `clusterEntries()` sends all entry texts to gpt-4o-mini, gets back 5-15 groups with entry indices and categories
   - Step 2: `summarizeGroup()` called in parallel (Promise.all) for each cluster, generating severity/problem/impact/reproductionSteps/suggestion
   - `runPipeline()` orchestrates both steps, builds FeedbackGroup[] and entry-to-group assignments

4. **AI route** (`ai.ts`): POST /api/ai/process triggers pipeline with `isProcessing` race condition guard (409 if busy). Replaces groups array and updates entry groupIds on success. GET /api/ai/status for polling.

5. **Server updates** (`index.ts`): Mounts entries and AI routers. Warns at startup if OPENAI_API_KEY not set.

## Route Refactoring

Both `groups.ts` and `analytics.ts` were refactored from:
```typescript
const require = createRequire(import.meta.url);
const groups = require("../data/groups.json") as Array<Record<string, unknown>>;
```
To:
```typescript
import { entries, groups } from "../data/store.js";
```
All type casts (`as string`, `as string[]`) removed since data is now properly typed through the store.

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compiles with zero errors (`npx tsc --noEmit`)
- All 4 new files created, 3 files updated, 1 package dependency added
