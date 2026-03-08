# Roadmap: UX Feedback Compiler

## Overview

A 3-hour hackathon build that delivers a polished AI-powered feedback dashboard. The build order follows the critical insight from research: get the entire UI working against pre-seeded data first (Phase 1), layer AI processing and live input on top (Phase 2), then add high-risk wow-factor features and demo polish (Phase 3). Pre-computed seed groups mean the dashboard works even if AI or rrweb integration fails -- every phase adds value without breaking what came before.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Core UI** - Express server with seed data powering a complete, polished dashboard and detail views
- [ ] **Phase 2: AI Pipeline + Live Input** - OpenAI-powered clustering and summarization with live feedback submission
- [ ] **Phase 3: Enhancements + Demo Polish** - Session replay, graph visualization, and demo rehearsal

## Phase Details

### Phase 1: Foundation + Core UI
**Goal**: Users see a fully working, polished dashboard with grouped feedback, detail views, and screenshots -- all powered by pre-seeded data with zero AI dependency
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-03, DATA-04, DASH-01, DASH-02, DASH-04, DETL-01, DETL-02, DETL-03, UI-01, UI-02, UI-04
**Success Criteria** (what must be TRUE):
  1. Opening the app shows a dashboard with 8-12 feedback group cards displaying title, summary snippet, entry count, and severity badge
  2. Clicking a group card navigates to a detail view showing full AI summary, reproduction steps, improvement suggestion, and all raw feedback entries
  3. Screenshots appear alongside feedback entries in the detail view
  4. Analytics section displays feedback volume, severity distribution, and category breakdown charts
  5. The entire UI uses a consistent dark theme and looks demo-ready on a large screen
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md -- Express API server with seed data and REST endpoints
- [x] 01-02-PLAN.md -- Vite React frontend scaffold with shadcn/ui, dark theme, types, API client
- [x] 01-03-PLAN.md -- Dashboard UI (header nav, stats row, PM insights, glass-card grid)
- [x] 01-04-PLAN.md -- Detail panel + Analytics page (slide-in panel, charts, screenshot lightbox)

### Phase 2: AI Pipeline + Live Input
**Goal**: Users can submit new feedback and watch AI cluster it into groups with generated summaries, reproduction steps, and severity scores
**Depends on**: Phase 1
**Requirements**: DATA-02, AI-01, AI-02, AI-03, AI-04, AI-05, UI-03
**Success Criteria** (what must be TRUE):
  1. User can submit new feedback through a form and see it appear in the system
  2. Triggering AI processing clusters all feedback into groups based on underlying problem similarity
  3. Each group receives an AI-generated summary with problem statement, impact description, improvement suggestion, reproduction steps, and severity score
  4. Loading states and animations are visible while AI processing runs
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md -- Backend: in-memory store, entry submission, and two-step AI pipeline
- [ ] 02-02-PLAN.md -- Frontend: feedback form, AI processing trigger with loading states

### Phase 3: Enhancements + Demo Polish
**Goal**: Session replay and graph visualization add wow-factor differentiation, and the demo is rehearsed and bulletproof
**Depends on**: Phase 2
**Requirements**: DASH-03, DETL-04, DETL-05
**Success Criteria** (what must be TRUE):
  1. Detail view plays back rrweb session recordings showing exactly what the user experienced
  2. When session replay is unavailable, an annotated screenshot display appears as fallback
  3. Dashboard includes an interactive graph visualization showing how feedback clusters connect to each other
  4. A complete demo run (dashboard tour, detail drill-down, live feedback submission, session replay) executes without errors
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Core UI | 4/4 | Complete | 2026-03-08 |
| 2. AI Pipeline + Live Input | 1/2 | In Progress|  |
| 3. Enhancements + Demo Polish | 0/2 | Not started | - |
