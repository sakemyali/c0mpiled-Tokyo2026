# Requirements: UX Feedback Compiler

**Defined:** 2026-03-08
**Core Value:** Companies have too much feedback data that goes to waste. We make all of it useful -- grouped, summarized, and actionable.

## v1 Requirements

Requirements for hackathon demo. Each maps to roadmap phases.

### Data Ingestion

- [x] **DATA-01**: System loads 200-300 pre-crafted realistic feedback entries on startup (vague, duplicate, varied)
- [ ] **DATA-02**: User can submit new feedback via a live input form (simulating SDK ingestion)
- [x] **DATA-03**: Feedback entries include screenshot references displayed alongside text
- [x] **DATA-04**: System stores pre-recorded rrweb session data with seed entries

### AI Processing

- [ ] **AI-01**: AI groups similar feedback entries into issue clusters based on underlying problem
- [ ] **AI-02**: AI generates summary per group (problem statement, impact description, improvement suggestion)
- [ ] **AI-03**: AI generates step-by-step reproduction steps per group
- [ ] **AI-04**: AI assigns severity score per group (critical/high/medium/low) based on frequency and impact
- [ ] **AI-05**: AI processing uses two-step pipeline (cluster all, then summarize per group in parallel)

### Dashboard

- [ ] **DASH-01**: Dashboard displays all feedback groups as cards with title, summary snippet, entry count, and severity badge
- [ ] **DASH-02**: Dashboard shows analytics/metrics: feedback volume, severity distribution, category breakdown (charts)
- [ ] **DASH-03**: Dashboard includes graph visualization showing feedback cluster connections (Obsidian-style)
- [ ] **DASH-04**: Dashboard presents PM-useful data: most impacted areas, trending issues, duplicate detection counts

### Detail View

- [ ] **DETL-01**: User can click into a group to see full AI summary, reproduction steps, and improvement suggestion
- [ ] **DETL-02**: Detail view lists all raw feedback entries belonging to the group
- [ ] **DETL-03**: Detail view shows screenshots alongside feedback entries
- [ ] **DETL-04**: Detail view includes rrweb session replay for entries with session data
- [ ] **DETL-05**: Detail view falls back to annotated screenshot display when replay is unavailable

### UI/UX

- [x] **UI-01**: Polished, dark-theme, demo-ready interface using shadcn/ui + Tailwind
- [ ] **UI-02**: Smooth navigation between dashboard, detail view, and feedback form
- [ ] **UI-03**: Loading states and animations during AI processing
- [ ] **UI-04**: Responsive enough for demo on projector/large screen

## v2 Requirements

Deferred to post-hackathon.

### Integrations
- **INTG-01**: GitHub/Jira issue export from feedback groups
- **INTG-02**: Slack notification when new critical groups emerge

### Widget/SDK
- **WDGT-01**: Embeddable overlay widget for client apps
- **WDGT-02**: Auto-capture of DOM state and operation logs

### Persistence
- **PERS-01**: PostgreSQL database for feedback storage
- **PERS-02**: User authentication and multi-tenant workspaces

## Out of Scope

| Feature | Reason |
|---------|--------|
| User authentication | Zero demo value, 30+ min cost |
| Real database | In-memory sufficient for demo |
| Embeddable widget/SDK | Dashboard is the deliverable |
| Mobile responsive layout | Desktop demo only |
| Real-time WebSocket updates | Batch processing is sufficient |
| CSV/PDF export | Not impressive for judges |
| Settings/preferences page | No user config needed |
| Multi-tenant workspaces | Single demo instance |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Complete (01-01) |
| DATA-02 | Phase 2 | Pending |
| DATA-03 | Phase 1 | Complete (01-01) |
| DATA-04 | Phase 1 | Complete (01-01) |
| AI-01 | Phase 2 | Pending |
| AI-02 | Phase 2 | Pending |
| AI-03 | Phase 2 | Pending |
| AI-04 | Phase 2 | Pending |
| AI-05 | Phase 2 | Pending |
| DASH-01 | Phase 1 | Pending |
| DASH-02 | Phase 1 | Pending |
| DASH-03 | Phase 3 | Pending |
| DASH-04 | Phase 1 | Pending |
| DETL-01 | Phase 1 | Pending |
| DETL-02 | Phase 1 | Pending |
| DETL-03 | Phase 1 | Pending |
| DETL-04 | Phase 3 | Pending |
| DETL-05 | Phase 3 | Pending |
| UI-01 | Phase 1 | Complete |
| UI-02 | Phase 1 | Pending |
| UI-03 | Phase 2 | Pending |
| UI-04 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after roadmap creation*
