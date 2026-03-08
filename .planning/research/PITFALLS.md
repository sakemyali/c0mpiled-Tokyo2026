# Pitfalls Research

**Domain:** AI-powered feedback management platform (hackathon demo)
**Researched:** 2026-03-08
**Confidence:** MEDIUM

## Critical Pitfalls

### 1. Backend-First Death Spiral
**Risk:** CRITICAL
**Phase:** 1-2

Spending 90+ minutes perfecting AI prompts and backend logic while the dashboard (the actual demo wow moment) never gets built.

**Warning signs:** 45 min in and no UI component exists yet.
**Prevention:** Build dashboard against pre-computed seed data (static JSON) FIRST. AI integration is a layer on top, not a prerequisite.

### 2. rrweb Player Integration Failures
**Risk:** HIGH
**Phase:** 3-4

rrweb-player in React is fragile: missing CSS imports cause blank players, re-mounting without cleanup causes crashes, recordings are surprisingly large (500KB-5MB).

**Warning signs:** Blank div where player should be, console errors about cleanup.
**Prevention:**
- Import `rrweb-player/dist/style.css` explicitly
- Use `useEffect` cleanup to destroy player on unmount
- Test with real pre-recorded data early
- Have screenshot fallback if replay breaks

### 3. OpenAI Latency During Live Demo
**Risk:** HIGH
**Phase:** 2

GPT-4-class calls take 3-15 seconds. Judge clicks "Process" and stares at a spinner.

**Warning signs:** API calls consistently >5 seconds during development.
**Prevention:**
- Use `gpt-4o-mini` (fastest)
- Add staged loading animation (show progress, not spinner)
- Timeout at 15s and fall back to pre-computed results
- Pre-seeded groups mean dashboard always works

### 4. AI Output Format Instability
**Risk:** HIGH
**Phase:** 2

LLM responses vary in structure across calls. Field might be `reproSteps` one time, `reproduction_steps` another. JSON might be wrapped in markdown code blocks.

**Warning signs:** `JSON.parse` errors, missing fields in UI.
**Prevention:**
- Use `response_format: { type: "json_object" }` (structured output)
- Build validation/normalization layer
- Default values for every field
- Test prompt 3-5 times before committing to format

### 5. Feature Creep Under Time Pressure
**Risk:** HIGH
**Phase:** All

Adding "just one more feature" when the core isn't polished. A half-finished app with 10 features loses to a polished app with 3.

**Warning signs:** Starting a new feature in the last 45 minutes.
**Prevention:** Hard stop on new features at 2hr mark. Last hour is polish + demo prep only.

### 6. Screenshot Handling Complexity
**Risk:** MEDIUM
**Phase:** 1

Trying to handle real file uploads, image processing, storage. Massive time sink for marginal demo value.

**Warning signs:** Writing multer/file upload code in first hour.
**Prevention:** Use pre-existing image URLs in seed data. If live form needs screenshots, use base64 data URLs stored in-memory. No file system.

### 7. CORS Issues Between Client/Server
**Risk:** MEDIUM
**Phase:** 1

Vite dev server on :5173, Express on :3001. Fetch calls fail silently with CORS errors.

**Warning signs:** Network tab shows "blocked by CORS policy."
**Prevention:** Add `cors()` middleware to Express immediately. Or use Vite proxy config.

### 8. No Demo Script / Rehearsal
**Risk:** HIGH
**Phase:** Final

Building right up to demo time with no rehearsal. Live bugs, wrong tab open, confused flow.

**Warning signs:** Still coding 15 minutes before demo.
**Prevention:** Stop coding 20 minutes before demo. Write 5-step script. Rehearse once. Pre-load all browser tabs.

### 9. Over-Engineering the Seed Data
**Risk:** MEDIUM
**Phase:** 1

Writing a complex seed generation system when hand-crafted entries would be more realistic and faster.

**Warning signs:** Writing faker/seed scripts instead of typing JSON.
**Prevention:** Hand-write 20-30 realistic feedback entries in a JSON file. Include variety: vague ("it's broken"), detailed ("the save button on the profile page doesn't respond"), duplicates with different wording.

### 10. State Management Rabbit Hole
**Risk:** MEDIUM
**Phase:** 3

Adding Redux, Zustand, or complex state management for a 3-page app.

**Warning signs:** Installing state management library, creating store/slice files.
**Prevention:** TanStack Query for server state. Local `useState` for UI state. Nothing else needed.

### 11. Styling Paralysis
**Risk:** MEDIUM
**Phase:** 3

Spending 30+ minutes on custom CSS when component libraries exist.

**Warning signs:** Writing custom card/table/badge CSS from scratch.
**Prevention:** shadcn/ui provides Card, Table, Badge, Tabs out of the box. Dark theme via Tailwind. Copy-paste, don't design.

## Phase-Mapped Summary

| Phase | Key Pitfalls | Prevention |
|-------|-------------|------------|
| Phase 1 | Backend death spiral, CORS, seed over-engineering | Build data layer fast, use static JSON |
| Phase 2 | AI latency, output format instability | gpt-4o-mini, structured output, timeouts |
| Phase 3 | State management rabbit hole, styling paralysis, feature creep | TanStack Query, shadcn/ui, hard feature freeze |
| Phase 4 | rrweb integration failures | Test early, screenshot fallback |
| Final | No demo rehearsal | Stop 20min early, rehearse |

## Sources
- Based on training data knowledge of hackathon patterns, React/Express/OpenAI/rrweb ecosystems
- WebSearch unavailable during research
