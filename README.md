# Maisen

> AI-powered feedback intelligence platform.
> Clusters user feedback with AI, surfaces critical issues, and gives your team reproduction steps and fix suggestions.

## Tech Stack

- **Next.js 16** (App Router) — frontend + API routes in one app
- **React 19** / TypeScript 5.8 / Tailwind CSS 3
- **Framer Motion** — animations
- **OpenAI GPT-4o-mini** — clustering and summarization pipeline
- **In-memory store** — seeded with 8 groups and 47 feedback entries

## Getting Started

```bash
# install
make install

# run dev server (http://localhost:3000)
make dev
```

To enable the AI pipeline, set your OpenAI key:

```bash
export OPENAI_API_KEY=sk-...
make dev
```

## Makefile

| Command       | Description                          |
|---------------|--------------------------------------|
| `make dev`    | Start Next.js dev server             |
| `make install`| Install dependencies                 |
| `make build`  | Production build                     |
| `make start`  | Start production server              |
| `make lint`   | Run linter                           |
| `make clean`  | Remove .next and node_modules        |

## Routes

| Path                          | Description                        |
|-------------------------------|------------------------------------|
| `/`                           | Landing page                       |
| `/dashboard`                  | Feedback reports (from API)        |
| `/dashboard/analytics`        | Analytics overview (from API)      |
| `/dashboard/submit`           | Submit new feedback (POST to API)  |
| `/dashboard/reports/[id]`     | Report detail (from API)           |

## API

All API routes live inside `frontend/app/api/` as Next.js route handlers.

| Endpoint            | Method | Description                      |
|---------------------|--------|----------------------------------|
| `/api/groups`       | GET    | All feedback groups              |
| `/api/groups/[id]`  | GET    | Single group with entries        |
| `/api/entries`      | POST   | Submit new feedback entry        |
| `/api/entries`      | GET    | Ungrouped entries                |
| `/api/analytics`    | GET    | Aggregated stats                 |
| `/api/ai`           | POST   | Trigger AI clustering pipeline   |
| `/api/ai/status`    | GET    | Pipeline processing status       |

## Project Structure

```
frontend/
  app/
    page.tsx                       # Landing page
    layout.tsx                     # Root layout
    dashboard/
      layout.tsx                   # Sidebar + shell
      page.tsx                     # Reports list
      analytics/page.tsx           # Analytics
      submit/page.tsx              # Submit feedback form
      reports/[reportId]/page.tsx  # Report detail
    api/
      groups/route.ts              # GET /api/groups
      groups/[id]/route.ts         # GET /api/groups/:id
      entries/route.ts             # POST + GET /api/entries
      analytics/route.ts           # GET /api/analytics
      ai/route.ts                  # POST /api/ai
      ai/status/route.ts           # GET /api/ai/status
  components/ui/
    sidebar.tsx                    # Animated sidebar
  data/
    store.ts                       # In-memory store
    entries.json                   # Seed entries
    groups.json                    # Seed groups
  services/
    ai-pipeline.ts                 # OpenAI clustering + summarization
  lib/
    api.ts                         # Client-side fetch helpers
    types.ts                       # Shared TypeScript interfaces
    utils.ts                       # cn() helper
```

## How It Works

1. **Collect** — Feedback enters from app stores, support tickets, surveys, Slack, Intercom
2. **Cluster** — GPT-4o-mini groups similar feedback by underlying problem
3. **Summarize** — AI generates problem statements, impact assessments, reproduction steps, and fix suggestions
4. **Review** — Dashboard shows prioritized issue cards with severity badges
5. **Act** — Drill into any report for full context and AI recommendations

## Built for c0mpiled Tokyo 2026

March 8, 2026
