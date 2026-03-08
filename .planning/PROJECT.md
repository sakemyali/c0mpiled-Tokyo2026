# UX Feedback Compiler

## What This Is

An AI-powered platform that takes the massive, messy pile of feedback and data companies already have — but can't effectively use — and turns it into structured, actionable insights. Companies collect tons of user feedback (vague reports, duplicates, screenshots, session data) but it sits unmanaged and unhelpful. We ingest it all, group it intelligently, and surface clear issues with AI summaries, reproduction steps, improvement suggestions, and session replays. Built as a hackathon demo to show the vision: chaos in, clarity out.

## Core Value

Companies have too much feedback data that goes to waste. We make all of it useful — grouped, summarized, and actionable.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Seed data with realistic raw feedback (vague, duplicate, varied)
- [ ] Live input form to submit new feedback (simulating SDK ingestion)
- [ ] AI-powered grouping of similar feedback into issue clusters
- [ ] AI-generated summary per group (problem, impact, improvement suggestion)
- [ ] Dashboard view showing all feedback groups with summaries
- [ ] Individual group detail view with all raw feedback entries
- [ ] rrweb session replay embedded in detail view
- [ ] Screenshot display alongside feedback entries
- [ ] Polished, demo-ready UI

### Out of Scope

- Embeddable widget/SDK — not needed for demo, dashboard is the deliverable
- Real user authentication — demo app, no auth needed
- Database persistence — in-memory or file-based is fine for demo
- Real-time ingestion pipeline — batch processing is sufficient
- Mobile responsiveness — desktop demo only
- Production deployment — local demo

## Context

- **Hackathon**: c0mpiled Tokyo 2026, approximately 3 hours to build and demo
- **Problem space**: AI tools enable small teams to build fast, but feedback loops haven't kept up. Teams drown in vague, duplicate, unreproducible feedback
- **Demo narrative**: Show a company overwhelmed by unclear feedback, then show our tool turning it into clear, grouped, actionable issues
- **Session replay**: Using rrweb for DOM recording/replay to show exactly what users experienced
- **Target audience**: Hackathon judges — needs to be visually impressive and tell a clear story

## Constraints

- **Timeline**: ~3 hours total build time — must ruthlessly prioritize
- **Tech stack**: React frontend + Express backend
- **AI**: OpenAI API for feedback processing (grouping, summarization, analysis)
- **Data**: Seed data + live form input (no real SDK/widget integration)
- **Scope**: Demo quality, not production quality

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No widget, dashboard only | 3-hour constraint, dashboard is the wow moment | — Pending |
| React + Express | Team preference, familiar stack | — Pending |
| OpenAI for AI processing | Team preference | — Pending |
| Seed data + live form | Shows both pre-processed results and live capability | — Pending |
| rrweb for session replay | Industry standard for DOM replay, good hackathon demo | — Pending |

---
*Last updated: 2026-03-08 after initialization*
