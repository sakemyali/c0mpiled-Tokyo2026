# Architecture Patterns

**Domain:** AI-powered feedback analytics platform (hackathon demo)
**Researched:** 2026-03-08
**Confidence:** HIGH (well-understood stack, standard patterns)

## Recommended Architecture

Three-layer monorepo: React SPA frontend, Express API backend, OpenAI as external AI service. No database — all state in-memory.

```
+---------------------------------------------------+
|                   BROWSER                          |
|                                                    |
|  +-------------+  +-------------+  +------------+ |
|  |  Dashboard   |  |  Detail     |  |  Feedback  | |
|  |  View        |  |  View       |  |  Form      | |
|  |  (groups)    |  |  (replay +  |  |  (submit)  | |
|  |              |  |   entries)  |  |            | |
|  +------+------+  +------+------+  +-----+------+ |
|         |                |               |         |
|         +--------+-------+-------+-------+         |
|                  |                                  |
|              HTTP/REST                              |
+------------------|----------------------------------+
                   |
+------------------|----------------------------------+
|              EXPRESS API SERVER                     |
|                                                    |
|  +-------------+  +-------------+  +------------+ |
|  |  Feedback    |  |  AI         |  |  Session   | |
|  |  Controller  |  |  Controller |  |  Controller| |
|  +------+------+  +------+------+  +-----+------+ |
|         |                |               |         |
|  +------+------+  +------+------+  +-----+------+ |
|  |  Feedback    |  |  AI         |  |  Session   | |
|  |  Store       |  |  Service    |  |  Store     | |
|  |  (in-memory) |  |  (OpenAI)   |  |  (in-mem)  | |
|  +--------------+  +------+------+  +------------+ |
+----------------------------|-----------------------+
                             |
                   +---------+--------+
                   |    OpenAI API    |
                   |  (GPT-4o-mini)  |
                   +------------------+
```

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Feedback Form** (React) | Submit new feedback | Express API (POST /api/feedback) |
| **Dashboard View** (React) | Display all groups with summaries | Express API (GET /api/groups) |
| **Detail View** (React) | Group detail + entries + replay | Express API (GET /api/groups/:id) |
| **rrweb Player** (React) | Replay recorded DOM sessions | Session events from API |
| **Feedback Controller** (Express) | CRUD on feedback entries | Feedback Store |
| **AI Controller** (Express) | Trigger/retrieve AI processing | AI Service |
| **AI Service** (Express) | Orchestrate OpenAI calls | OpenAI API |
| **In-Memory Stores** (Express) | Hold feedback, groups, sessions | None (data layer) |
| **Seed Data Module** (Express) | Pre-populate demo data | All stores |

## Data Flow

### Flow 1: Feedback Submission
```
User types feedback → POST /api/feedback { text, screenshot?, sessionEvents? }
  → Store in FeedbackStore → Return { id, status: "received" }
  → If sessionEvents, store separately in SessionStore
```

### Flow 2: AI Processing (Batch)
```
Trigger: POST /api/ai/process
  → Collect all feedback from FeedbackStore
  → Step 1: Send to OpenAI — cluster by similar issues (JSON response)
  → Step 2: Per cluster, send to OpenAI — summarize (parallel, JSON response)
  → Store results in GroupStore
  → Return { groups, processedAt }
```

### Flow 3: Dashboard Display
```
Dashboard mounts → GET /api/groups
  → Return all groups with summaries, counts, severity
  → Render cards with title, summary snippet, severity badge, entry count
```

### Flow 4: Detail + Replay
```
Click group → GET /api/groups/:id
  → Return group + full entries + session references
Click "Watch Session" → GET /api/sessions/:id
  → Return rrweb events → rrweb-player replays
```

## API Surface

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/feedback | Submit new feedback |
| GET | /api/feedback | List all raw entries |
| POST | /api/ai/process | Trigger AI grouping + summarization |
| GET | /api/groups | List all processed groups |
| GET | /api/groups/:id | Get group detail with entries |
| GET | /api/sessions/:id | Get session recording events |
| POST | /api/seed | Reset and re-seed demo data |

## File Structure

```
project-root/
  client/                        # React SPA (Vite)
    src/
      components/
        Dashboard.tsx
        GroupDetail.tsx
        FeedbackForm.tsx
        SessionReplay.tsx
        GroupCard.tsx
        SeverityBadge.tsx
      App.tsx
      main.tsx
      api.ts                     # Fetch wrapper
  server/                        # Express API
    src/
      controllers/
        feedbackController.ts
        aiController.ts
        groupController.ts
        sessionController.ts
      services/
        aiService.ts             # OpenAI integration
      stores/
        feedbackStore.ts
        groupStore.ts
        sessionStore.ts
      seed/
        seedData.ts
        seedSessions.ts
        seedGroups.ts            # Pre-computed AI results
      index.ts
```

## Build Order

```
Phase 1: Data Foundation (backend stores + seed data + API endpoints)
  → Outcome: Server runs, has data, accepts new feedback

Phase 2: AI Pipeline (OpenAI integration)
  → Depends on: Phase 1
  → Outcome: Raw feedback becomes grouped insights

Phase 3: Dashboard UI (React frontend)
  → Depends on: Phase 1 + 2
  → Outcome: Visual demo of the "after" state

Phase 4: Detail + Replay (rrweb integration)
  → Depends on: Phase 3
  → Outcome: "Watch what user experienced" wow factor
```

**Critical path:** Phase 1 → 2 → 3 is the spine. Phase 4 decorates.

**Fallback:** Pre-seeded groups mean dashboard works even if OpenAI is down.

## Key Patterns

1. **Controller-Service-Store layering** — Even for hackathon, prevents spaghetti
2. **Two-step AI** — Cluster all, then summarize per group (parallel)
3. **Separate session storage** — rrweb events are large, fetch on-demand only
4. **Pre-seeded demo state** — Dashboard loads instantly, no AI wait

## Anti-Patterns to Avoid

1. **Single monolithic AI prompt** — Unreliable, hit token limits
2. **Real-time AI on each submission** — Too slow, clustering needs all data
3. **rrweb events in feedback objects** — Bloats every API response
4. **Client-side OpenAI calls** — Exposes API key

## Sources
- rrweb: github.com/rrweb-io/rrweb
- Express controller-service-store: standard Node.js layered architecture
- OpenAI structured output: stable in GPT-4o-mini
