# Project Research Summary

**Project:** c0mpiled — AI-powered feedback management platform
**Domain:** UX analytics / AI feedback synthesis (hackathon demo)
**Researched:** 2026-03-08
**Confidence:** MEDIUM

## Executive Summary

This is a hackathon demo product that sits at the intersection of session replay, feedback collection, and AI-powered synthesis — a gap no current tool fills. Competitors either capture user behavior (LogRocket, FullStory) or collect structured feedback (Canny, UserVoice), but none take raw unstructured feedback with auto-captured context and use AI to cluster, summarize, and generate actionable reproduction steps. The recommended approach is a React SPA + Express API monorepo with all state in-memory, GPT-4o-mini for AI processing, and rrweb for session replay. No database, no auth, no real-time infrastructure — zero setup overhead in a hackathon context.

The critical insight from research is that the dashboard is the demo. Everything else is scaffolding. This means Phase 1 must deliver a working, beautiful dashboard against pre-seeded data — even before the AI pipeline exists. The architecture supports this cleanly: pre-computed seed groups can power the entire UI, with live AI processing layered on top as an enhancement, not a prerequisite.

The biggest risk is time allocation failure: spending 90+ minutes on backend/AI work while the visual demo moment never gets built. Research consistently flags that pre-seeded data + stable AI output validation + rrweb integration testing are the three areas where hackathon teams lose hours. The mitigations are all build-order decisions: UI-first with static data, AI second with structured output and fallbacks, rrweb last with a screenshot escape hatch.

## Key Findings

### Recommended Stack

A lean, zero-config monorepo. Frontend uses Vite + React 19 + TypeScript 5 + Tailwind 4 + shadcn/ui for instant polished UI, TanStack Query for server state (no Redux needed), and React Router 7 for navigation. Backend is Express 4 + TypeScript with `tsx` for execution — no build step required during development. OpenAI SDK 4.x with GPT-4o-mini for AI, rrweb-player for session replay.

Notably absent: Next.js (SSR adds complexity with no benefit), any database (in-memory Maps are sufficient and eliminate 30+ min of setup), Redux/Zustand (TanStack Query handles all server state), WebSockets (batch processing + polling is sufficient), and Docker (local demo only).

**Core technologies:**
- **React 19 + Vite 6**: Frontend — fastest dev iteration, instant HMR
- **shadcn/ui + Tailwind 4**: UI layer — polished dark-theme components, zero custom CSS needed
- **TanStack Query 5**: Server state — eliminates useEffect fetching boilerplate
- **Express 4 + tsx**: Backend — minimal setup, TypeScript without build step
- **GPT-4o-mini via OpenAI SDK 4**: AI processing — fastest model, cheapest, sufficient quality
- **rrweb-player 2**: Session replay — embedded DOM recording playback
- **In-memory Maps + JSON seed files**: Data layer — zero setup, demo resets cleanly

**Version concerns:** rrweb package name needs verification (`rrweb` vs `@rrweb/player`), and Tailwind v4 compatibility with shadcn/ui should be confirmed at install time — fall back to v3 if needed.

### Expected Features

Research identifies a clear tiered priority based on demo narrative and time budget. The market gap this product fills only becomes apparent when judges experience the "before/after" moment: raw chaotic feedback transformed into structured, actionable groups.

**Must have (table stakes):**
- Dashboard with AI-grouped issues (cards, severity badges, counts) — the entire product value is visible here
- AI-generated summaries per group (problem statement, impact, suggestion) — proves AI is doing real work
- Individual feedback entries within each group — shows aggregation of real user reports
- Polished dark-theme UI — hackathon judges expect visual quality
- Pre-seeded data that loads instantly — dashboard cannot open to an empty state

**Should have (wow factor):**
- Live AI classification — submit feedback, watch it get grouped in real time
- Session replay (rrweb) — "watch exactly what the user experienced"
- AI-generated reproduction steps — concrete value for engineering teams
- AI improvement suggestions — concrete value for product teams
- Duplicate detection callout — "12 users reported this same issue"

**Defer to v2+ (time sinks with low demo value):**
- User authentication, real database, WebSocket real-time, mobile layout, settings, CSV export, multi-tenant, voting/upvoting, heatmaps, GitHub/Jira integrations

### Architecture Approach

Three-layer monorepo: React SPA (client/) talks to Express API (server/) over HTTP/REST; Express talks to OpenAI as the sole external dependency. All state lives in typed in-memory Map stores on the server, pre-populated from seed files at startup. No persistence, no message queue, no cache layer.

The AI pipeline runs in two serial-then-parallel steps: cluster all feedback in one OpenAI call (returns group assignments as JSON), then summarize each group in parallel OpenAI calls. Sessions (rrweb events) are stored separately and fetched on-demand only — they can be 500KB-5MB and would bloat every group detail response.

**Major components:**
1. **Seed Data Module** — pre-populates FeedbackStore, GroupStore, SessionStore at startup; fallback if OpenAI is unavailable
2. **AI Service** — two-step OpenAI pipeline (cluster → summarize per group in parallel) with structured output and response normalization
3. **Dashboard View** — primary demo surface; displays all groups with severity, count, AI summary; powered by GET /api/groups
4. **Group Detail View** — entries list + AI insights + rrweb session replay; the "deep dive" moment
5. **Feedback Form** — live classification demo; POST /api/feedback triggers immediate group assignment
6. **In-Memory Stores** — FeedbackStore, GroupStore, SessionStore; typed Maps, reset via POST /api/seed

### Critical Pitfalls

1. **Backend-first death spiral** — Avoid by building the dashboard against pre-computed seed JSON before touching OpenAI integration. If 45 minutes pass and no React component exists, the build order is wrong.

2. **AI output format instability** — Use `response_format: { type: "json_object" }` on all OpenAI calls. Build a normalization layer with default values for every expected field. Test the prompt 3-5 times and lock the field names before building UI that depends on them.

3. **OpenAI latency during live demo** — Use gpt-4o-mini exclusively. Add staged loading animations (not blank spinners). Implement a 15-second timeout that falls back to pre-computed results. The pre-seeded groups mean the dashboard always works regardless.

4. **rrweb player integration failures** — Import `rrweb-player/dist/style.css` explicitly or the player renders as a blank div. Use `useEffect` cleanup to destroy the player on unmount. Test with real pre-recorded data early in Phase 4. Have a screenshot fallback in case replay breaks under time pressure.

5. **No demo rehearsal** — Stop coding 20 minutes before demo time. Write a 5-step script. Pre-load all browser tabs. A polished 3-feature app with a rehearsed narrative beats a half-finished 10-feature app every time.

## Implications for Roadmap

Based on research, the architecture's explicit build order maps cleanly to four phases. The dependency chain is strict: UI needs data, data needs seed structure, AI needs data to process, replay needs sessions to play.

### Phase 1: Data Foundation

**Rationale:** Every other phase depends on working API endpoints and seed data. This phase eliminates all "no data to show" blockers before any UI work begins. Build order is the primary pitfall prevention mechanism.
**Delivers:** Express server running, all stores typed and populated, all API endpoints responding with realistic seed data, CORS configured
**Addresses:** Dashboard view (pre-seeded), feedback submission endpoint, session storage
**Avoids:** Backend death spiral (UI is the next phase, not an afterthought), CORS errors on first fetch, seed data over-engineering (hand-write JSON, don't generate it)
**Stack:** Express 4, tsx, TypeScript, in-memory Maps, cors middleware

### Phase 2: AI Pipeline

**Rationale:** AI is a layer on top of existing data — it reads from FeedbackStore and writes to GroupStore. This phase can be skipped entirely (fallback to pre-seeded groups) if time runs short, which is why it comes before UI but its output is already stubbed by seed data.
**Delivers:** POST /api/ai/process triggers two-step OpenAI pipeline; groups are generated from real feedback; response normalization handles field variance
**Uses:** OpenAI SDK 4, GPT-4o-mini, structured output (`json_object`), parallel Promise.all for per-group summaries
**Implements:** AI Service + AI Controller; connects to GroupStore
**Avoids:** AI output format instability (normalization layer), latency issues (timeout + fallback to pre-seeded)

### Phase 3: Dashboard and Core UI

**Rationale:** This is the primary demo moment. With seed data from Phase 1 (and optionally AI results from Phase 2) available, the React frontend can be built against real API responses. UI comes third, not first, to avoid building against mocked data that diverges.
**Delivers:** Dashboard with group cards, severity badges, entry counts; Group Detail view with entries list and AI insights; Feedback Form with live classification
**Addresses:** All "must have" table stakes features, live AI classification "wow factor"
**Avoids:** State management rabbit hole (TanStack Query only, no Redux), styling paralysis (shadcn/ui components, dark theme via Tailwind), feature creep (hard freeze on new features at the 2-hour mark)
**Stack:** React 19, Vite 6, TanStack Query 5, shadcn/ui, Tailwind 4, React Router 7

### Phase 4: Session Replay

**Rationale:** rrweb integration is the highest-risk UI feature and also the most optional — screenshots are a valid fallback. Placing it last means the core demo works without it. If integration fails, cut it; the product still demonstrates the core value proposition.
**Delivers:** rrweb player embedded in Group Detail view; "Watch Session" button loads recorded DOM events; cleanup on unmount
**Addresses:** Session replay "wow factor" differentiator
**Avoids:** rrweb blank-player trap (explicit CSS import), memory leaks (useEffect cleanup), bloated responses (sessions fetched on-demand only, never bundled with group data)
**Fallback:** Screenshot display if rrweb breaks

### Phase 5: Polish and Demo Prep

**Rationale:** Research explicitly flags no-rehearsal as a HIGH risk pitfall. This phase is not optional. A feature freeze must happen before this phase starts — no new features, only polish.
**Delivers:** Loading animations, before/after toggle, demo script, pre-loaded browser tabs, one full rehearsal run
**Avoids:** Live bugs from unrehearsed flow, wrong tab open, confused demo narrative

### Phase Ordering Rationale

- **Data before UI:** The dashboard cannot render without API endpoints. Seed data means UI can be built without waiting for AI, and the demo works even if OpenAI is unavailable.
- **AI before UI:** AI output format must be locked before building UI that maps over its fields — otherwise the normalization layer gets built twice.
- **rrweb last:** Highest integration risk, lowest functional necessity. Must not block the core demo.
- **Polish as a phase:** Research identifies no-rehearsal as a real failure mode, not a nice-to-have. Treating demo prep as a phase with a hard start time is the mitigation.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (AI Pipeline):** Prompt engineering for reliable two-step clustering + summarization needs iteration. Recommend writing and testing prompts manually before committing to field names the UI depends on.
- **Phase 4 (Session Replay):** rrweb package names and React integration patterns have changed across versions. Verify `npm info rrweb` and `npm info @rrweb/player` before writing integration code.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Data Foundation):** Express + TypeScript in-memory stores are completely standard. No novel patterns.
- **Phase 3 (Dashboard UI):** React + TanStack Query + shadcn/ui is a well-documented, stable combination. Component patterns are copy-paste from shadcn docs.
- **Phase 5 (Demo Prep):** No research needed — this is execution discipline.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Core choices (React, Express, OpenAI, Tailwind) are HIGH confidence. rrweb package names are LOW — need npm verification. Tailwind v4/shadcn compatibility needs confirmation at install. |
| Features | MEDIUM | Competitive landscape analysis from training data, no live market research. Feature prioritization is well-reasoned for hackathon context. |
| Architecture | HIGH | Three-layer monorepo + controller-service-store is a standard, well-understood pattern. API surface is minimal and correct. Two-step AI pipeline is a validated approach. |
| Pitfalls | MEDIUM | Based on training data knowledge of hackathon patterns and the specific ecosystem tools. The rrweb and AI latency pitfalls are well-documented historically. |

**Overall confidence:** MEDIUM

### Gaps to Address

- **rrweb package name and API:** Run `npm info rrweb` and `npm info @rrweb/player` to determine correct package and import paths before Phase 4 begins. Do not assume v2 API matches v1 docs.
- **Tailwind v4 + shadcn/ui compatibility:** At project initialization, confirm shadcn/ui supports Tailwind 4. If `npx shadcn-ui init` throws errors, pin to Tailwind 3 immediately — do not debug v4 compatibility mid-hackathon.
- **gpt-4o-mini model name:** Verify the exact model identifier string hasn't changed before the first OpenAI call. Use `gpt-4o-mini` and handle a 404 as a model-name error, falling back to `gpt-4o`.
- **AI prompt format:** The two-step clustering + summarization prompts need to be tested manually (3-5 iterations) before being hardcoded. Lock the JSON field names, then build UI — not the other way around.

## Sources

### Primary (HIGH confidence)
- Express controller-service-store: standard Node.js layered architecture
- React + TanStack Query: official TanStack docs (training data)
- OpenAI structured output: GPT-4o-mini `json_object` response format

### Secondary (MEDIUM confidence)
- rrweb: github.com/rrweb-io/rrweb — integration patterns from training data
- Hackathon build patterns: aggregated from training data knowledge
- Competitive landscape: Hotjar, Canny, LogRocket, UserVoice, BugHerd, Marker.io (training data)

### Tertiary (LOW confidence)
- rrweb v2 exact package names: needs runtime verification with `npm info`
- Tailwind v4 + shadcn/ui compatibility: needs verification at project init

---
*Research completed: 2026-03-08*
*Ready for roadmap: yes*
