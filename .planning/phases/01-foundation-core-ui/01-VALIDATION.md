---
phase: 1
slug: foundation-core-ui
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 1 -- Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x + @testing-library/react |
| **Config file** | none -- Wave 0 installs |
| **Quick run command** | `cd client && npx vitest run --reporter=verbose` |
| **Full suite command** | `cd client && npx vitest run && cd ../server && npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd client && npx vitest run --reporter=verbose`
- **After every plan wave:** Run `cd client && npx vitest run && cd ../server && npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | DATA-01 | unit | `cd server && npx vitest run src/__tests__/seed-data.test.ts -t "loads entries"` | W0 | pending |
| 01-01-02 | 01 | 1 | DATA-03 | unit | `cd server && npx vitest run src/__tests__/seed-data.test.ts -t "screenshot references"` | W0 | pending |
| 01-01-03 | 01 | 1 | DATA-04 | unit | `cd server && npx vitest run src/__tests__/seed-data.test.ts -t "session data"` | W0 | pending |
| 01-02-01 | 02 | 1 | UI-01 | smoke | `cd client && npx vitest run src/__tests__/theme.test.ts` | W0 | pending |
| 01-03-01 | 03 | 2 | DASH-01 | unit | `cd client && npx vitest run src/__tests__/GroupCard.test.tsx` | W0 | pending |
| 01-03-02 | 03 | 2 | DASH-02 | unit | `cd client && npx vitest run src/__tests__/Analytics.test.tsx` | W0 | pending |
| 01-03-03 | 03 | 2 | DASH-04 | unit | `cd client && npx vitest run src/__tests__/InsightsRow.test.tsx` | W0 | pending |
| 01-03-04 | 03 | 2 | UI-02 | unit | `cd client && npx vitest run src/__tests__/Navigation.test.tsx` | W0 | pending |
| 01-03-05 | 03 | 2 | UI-04 | smoke | `cd client && npx vitest run src/__tests__/Layout.test.tsx` | W0 | pending |
| 01-04-01 | 04 | 3 | DETL-01 | unit | `cd client && npx vitest run src/__tests__/DetailPanel.test.tsx` | W0 | pending |
| 01-04-02 | 04 | 3 | DETL-02 | unit | `cd client && npx vitest run src/__tests__/DetailPanel.test.tsx -t "entries"` | W0 | pending |
| 01-04-03 | 04 | 3 | DETL-03 | unit | `cd client && npx vitest run src/__tests__/DetailPanel.test.tsx -t "screenshots"` | W0 | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `client/vitest.config.ts` -- Vitest configuration with jsdom environment
- [ ] `client/src/__tests__/setup.ts` -- Testing library setup with jest-dom matchers
- [ ] `server/vitest.config.ts` -- Vitest configuration for Node environment
- [ ] Framework install: `cd client && npm install -D vitest @testing-library/react @testing-library/dom @testing-library/jest-dom jsdom`
- [ ] Framework install: `cd server && npm install -D vitest`
- [ ] `server/src/__tests__/seed-data.test.ts` -- covers DATA-01, DATA-03, DATA-04
- [ ] `client/src/__tests__/GroupCard.test.tsx` -- covers DASH-01
- [ ] `client/src/__tests__/Analytics.test.tsx` -- covers DASH-02
- [ ] `client/src/__tests__/InsightsRow.test.tsx` -- covers DASH-04
- [ ] `client/src/__tests__/DetailPanel.test.tsx` -- covers DETL-01, DETL-02, DETL-03
- [ ] `client/src/__tests__/Navigation.test.tsx` -- covers UI-02
- [ ] `client/src/__tests__/theme.test.ts` -- covers UI-01
- [ ] `client/src/__tests__/Layout.test.tsx` -- covers UI-04

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark theme looks polished on large screen | UI-04 | Visual quality assessment | Open app in fullscreen on 1920+ display, verify no overflow, consistent dark theme |
| Glass effects render correctly | UI-01 | Visual assessment of backdrop-blur/gradients | Inspect card surfaces for glass effect, check on different backgrounds |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
