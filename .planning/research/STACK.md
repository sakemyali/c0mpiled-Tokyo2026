# Stack Research

**Domain:** AI-powered feedback management platform (hackathon demo)
**Researched:** 2026-03-08
**Confidence:** MEDIUM (training data based, web verification unavailable for some versions)

## Recommended Stack

### Frontend
| Technology | Version | Rationale | Confidence |
|-----------|---------|-----------|------------|
| **Vite** | 6.x | Fastest React dev server, instant HMR | HIGH |
| **React** | 19.x | Team preference, component model | HIGH |
| **TypeScript** | 5.x | Type safety, better DX | HIGH |
| **Tailwind CSS** | 4.x | Rapid UI styling, no CSS files | HIGH |
| **shadcn/ui** | latest | Pre-built components (Card, Table, Badge, Tabs) — polished without custom CSS | HIGH |
| **Recharts** | 2.x | Simple chart components for dashboard metrics | MEDIUM |
| **TanStack Query** | 5.x | Server state management, eliminates useEffect boilerplate | HIGH |
| **rrweb-player** | 2.x | Session replay playback (verify: may be `@rrweb/player` scoped package) | LOW |
| **React Router** | 7.x | Client-side routing (dashboard, detail, form views) | HIGH |

### Backend
| Technology | Version | Rationale | Confidence |
|-----------|---------|-----------|------------|
| **Express** | 4.x | Team preference, minimal setup | HIGH |
| **TypeScript** | 5.x | Shared types with frontend | HIGH |
| **OpenAI SDK** | 4.x | Official Node SDK for GPT-4o-mini calls | HIGH |
| **cors** | 2.x | CORS middleware for dev | HIGH |
| **tsx** | 4.x | TypeScript execution without build step | HIGH |

### AI Processing
| Technology | Rationale | Confidence |
|-----------|-----------|------------|
| **GPT-4o-mini** | Fast, cheap, sufficient for clustering + summarization | HIGH |
| **Structured Outputs** | `response_format: { type: "json_object" }` for reliable JSON | MEDIUM |
| **Two-step pipeline** | Cluster all → Summarize per group (parallel) | HIGH |

### Data (No Database)
| Approach | Rationale |
|----------|-----------|
| **In-memory Maps** | Zero setup, resets on restart, perfect for demo |
| **JSON seed files** | Pre-crafted realistic feedback + pre-computed AI results |
| **Pre-seeded groups** | Dashboard loads instantly without waiting for AI |

## What NOT to Use
| Technology | Why Not |
|-----------|---------|
| Next.js | Overkill — SSR not needed, adds complexity for a SPA demo |
| PostgreSQL/MongoDB | Any DB costs 30+ min setup for zero demo value |
| Redis | No caching needed for demo scale |
| Socket.io/WebSocket | Real-time not needed, batch processing is sufficient |
| Redux/Zustand | TanStack Query handles server state; no complex client state |
| Prisma | No database, no ORM |
| Docker | Local demo only |

## Open Questions
- **rrweb v2 package names:** Verify `rrweb` vs `@rrweb/player` with `npm info` before installing
- **Tailwind v4 vs v3:** If v4 causes issues with shadcn, fall back to v3
- **gpt-4o-mini availability:** Verify model name hasn't changed

## Sources
- Based on training data knowledge of React, Express, OpenAI, rrweb ecosystems
- WebSearch unavailable during research
