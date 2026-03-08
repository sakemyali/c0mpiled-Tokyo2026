# Features Research

**Domain:** AI-powered feedback management / UX analytics
**Researched:** 2026-03-08
**Confidence:** MEDIUM

## Competitive Landscape

The market is fragmented:
- **Session replay** (LogRocket, FullStory): Watch what users do, but no AI synthesis
- **Feedback collection** (Canny, UserVoice): Collect votes/requests, but users must write well-structured reports
- **Bug reporting** (BugHerd, Marker.io): Visual bug reports, but no AI grouping or insight generation
- **Surveys** (Hotjar, Sprig): Structured questions, but miss unstructured frustration

**Gap this product fills:** No tool takes messy, unstructured feedback AND auto-captured context, then uses AI to cluster, summarize, and generate actionable issues with reproduction steps.

## Table Stakes (Must Have for Demo)

| Feature | Complexity | Description |
|---------|-----------|-------------|
| **Dashboard with grouped issues** | Medium | Card/list view of AI-generated feedback groups with titles and summaries |
| **Individual feedback entries** | Low | View raw feedback text within each group |
| **AI-generated summaries** | Medium | Per-group: problem statement, impact, suggestion |
| **Visual severity indicators** | Low | Color-coded badges (critical/high/medium/low) |
| **Polished, dark-theme UI** | Medium | Professional look — shadcn/ui components, consistent design |
| **Seed data pre-loaded** | Low | Dashboard loads with impressive data immediately |

## Differentiators (Wow Factor)

| Feature | Complexity | Demo Impact | Description |
|---------|-----------|-------------|-------------|
| **Live AI classification** | High | HIGHEST | Submit feedback live → watch it get classified into a group in real-time |
| **Session replay (rrweb)** | High | High | Watch what the user experienced, embedded in detail view |
| **AI reproduction steps** | Low | High | AI generates step-by-step repro from feedback text + context |
| **AI improvement suggestions** | Low | High | AI suggests concrete fixes per issue group |
| **Before/after narrative** | Low | High | Dashboard shows "raw mess" vs "structured clarity" |
| **Severity scoring** | Low | Medium | AI assigns severity based on frequency + impact |
| **Duplicate detection callout** | Low | Medium | Show "12 users reported this same issue" |
| **Screenshot display** | Medium | Medium | Screenshots alongside feedback entries |

## Anti-Features (Do NOT Build)

| Feature | Time Cost | Why Not |
|---------|-----------|---------|
| User authentication | 30-45 min | Zero demo value |
| Embeddable SDK/widget | 60+ min | Out of scope per PROJECT.md |
| Real database | 30+ min | In-memory is sufficient |
| WebSocket real-time updates | 45+ min | Polling/refresh is fine for demo |
| Mobile responsive layout | 30+ min | Desktop demo only |
| Settings/preferences | 20+ min | No user config needed |
| CSV/PDF export | 20+ min | Not impressive for judges |
| Multi-tenant/workspace | 45+ min | Single demo instance |
| Voting/upvoting on issues | 30+ min | Different product (Canny) |
| Heatmaps | 60+ min | Different product (Hotjar) |
| GitHub/Jira integrations | 45+ min | Feature creep |

## Feature Dependencies

```
Seed Data → Dashboard View → Group Detail View → Session Replay
                ↑                    ↑
            AI Grouping          AI Summary
                ↑
        Feedback Submission (live form)
```

## MVP Recommendation (3-Hour Build)

**Must Build (first 2 hours):**
1. Backend with seed data + API endpoints
2. AI grouping + summarization pipeline
3. Dashboard view with grouped issues
4. Group detail view with entries + AI summary

**Should Build (next 45 min):**
5. Live feedback form with instant classification
6. Session replay in detail view
7. Screenshot display

**Nice to Have (final 15 min):**
8. Loading animations + transitions
9. "Before/after" toggle showing raw vs processed
10. Demo script rehearsal

## Demo Narrative Arc

1. **The Problem**: Show 50 raw feedback entries — messy, vague, duplicate, unactionable
2. **The Solution**: Click "Process" — watch AI cluster and summarize
3. **The Dashboard**: Beautiful grouped view with severity, counts, summaries
4. **The Deep Dive**: Click into a group — see all entries, repro steps, suggestions
5. **The Replay**: Watch exactly what the user experienced via session replay
6. **Live Demo**: Judge submits feedback → instantly classified

## Sources
- Competitor analysis based on training data (Hotjar, Canny, LogRocket, UserVoice, BugHerd, Marker.io)
- WebSearch unavailable during research
