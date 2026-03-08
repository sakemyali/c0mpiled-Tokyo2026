# 🌸 Maisen — AI Feedback Intelligence Platform

![Hackathon Tokyo 2026](https://img.shields.io/badge/Hackathon-Tokyo%202026-blueviolet?style=for-the-badge)
![Built with Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![AI Powered](https://img.shields.io/badge/AI-GPT--4o--mini-412991?style=for-the-badge&logo=openai)

> Transform scattered user feedback into actionable product insights.  
> AI clusters similar issues, generates summaries, reproduction steps, and fix suggestions — all in one dashboard.

**Maisen** (舞仙 — "dancing sage") automatically organizes the chaos of user feedback into clear, prioritized problem reports. Stop manually reading hundreds of comments — let AI group similar issues and tell you what to fix first.

---

## 🎯 Problem

Product teams drown in unstructured feedback:

• Support tickets, app store reviews, surveys, and Slack messages pile up across tools  
• PMs spend 4-6 hours manually reading and grouping similar complaints  
• Critical issues get lost in noise — no way to see patterns  
• Engineers waste time asking for reproduction steps and context  
• Insights arrive too late — by the time trends emerge, users have already churned

## 💡 Solution

Maisen automates the entire feedback analysis pipeline:

1. **Collect** → Import feedback from any source (API, CSV, manual entry)
2. **Cluster** → GPT-4o-mini groups similar feedback by underlying root cause
3. **Summarize** → AI generates problem statements, impact analysis, and fix suggestions
4. **Prioritize** → Severity scoring (Critical → Low) based on user count and sentiment
5. **Act** → Engineers get reproduction steps and recommendations in one click

---

## ✨ Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| 🧠 **AI Clustering** | Groups similar feedback by underlying problem, not keywords | GPT-4o-mini embeddings + semantic similarity |
| 📊 **Smart Summaries** | Problem statement, impact assessment, reproduction steps, fix suggestions | Structured GPT-4o-mini prompts with JSON schema validation |
| 🎯 **Severity Scoring** | Auto-assigned Critical/High/Medium/Low based on user reach and sentiment | AI-determined with manual override option |
| 📈 **Analytics Dashboard** | Volume trends, severity distribution, category breakdown with Recharts | Real-time aggregation from feedback store |
| 🔍 **Detail Drill-Down** | Click any group → see AI summary + all raw feedback entries | Slide-in panel with screenshot gallery |
| 📸 **Screenshot Context** | Visual evidence linked to each feedback entry | Image upload + lightbox viewer |
| 🎨 **Glass-Morphism UI** | Dark theme with frosted glass cards and smooth animations | Tailwind CSS 4 + custom backdrop utilities |
| ⚡ **Sub-Second Load** | Optimized with React 19 concurrent rendering | Next.js App Router with streaming SSR |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js App (Port 3000)                  │
│                     Frontend + Backend in One                   │
│                                                                 │
│  ┌──────────────────────────┐  ┌─────────────────────────────┐ │
│  │      Frontend (React)     │  │     API Routes (Node)       │ │
│  │                           │  │                             │ │
│  │  • Landing Page           │  │  • /api/groups              │ │
│  │  • Dashboard              │  │  • /api/groups/[id]         │ │
│  │  • Analytics              │  │  • /api/entries             │ │
│  │  • Submit Feedback        │  │  • /api/analytics           │ │
│  │  • Report Detail Panel    │  │  • /api/ai                  │ │
│  │                           │  │  • /api/ai/status           │ │
│  └─────────┬─────────────────┘  └──────────┬──────────────────┘ │
│            │                               │                    │
│            │  fetch() API calls            │                    │
│            └───────────┬───────────────────┘                    │
│                        │                                        │
│            ┌───────────▼────────────┐                           │
│            │   In-Memory Data Store │                           │
│            │   (data/store.ts)      │                           │
│            │                        │                           │
│            │  • groups.json (8)     │                           │
│            │  • entries.json (47)   │                           │
│            └───────────┬────────────┘                           │
│                        │                                        │
│            ┌───────────▼────────────┐                           │
│            │   AI Pipeline Service  │                           │
│            │   (services/ai-pipeline)│                          │
│            │                        │                           │
│            │  1. Clustering         │                           │
│            │  2. Summarization      │                           │
│            │  3. Severity Scoring   │                           │
│            └───────────┬────────────┘                           │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │     OpenAI API (GPT-4o-mini)  │
         │                               │
         │  • Embeddings for clustering  │
         │  • Chat completions for text  │
         │  • Structured JSON outputs    │
         └───────────────────────────────┘
```

### Data Flow

1. **User submits feedback** → `POST /api/entries` → Stored in in-memory store
2. **Trigger AI processing** → `POST /api/ai` → Batch processes all ungrouped entries
3. **Clustering step** → OpenAI embeddings → Semantic similarity calculation → Groups formed
4. **Summarization step** → GPT-4o-mini analyzes each group → Structured JSON output
5. **Dashboard refresh** → `GET /api/groups` → Updated groups displayed
6. **Detail view** → User clicks group → `GET /api/groups/[id]` → Panel slides in with full context

---

## 🚀 Getting Started

### Prerequisites

• **Node.js** ≥ 18.0 (recommended: 20 LTS)  
• **npm** ≥ 9.0  
• **OpenAI API Key** (for AI clustering — [get one here](https://platform.openai.com/api-keys))

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/maisen.git
cd maisen
make install
```

### 2. Environment Setup

Create a `.env.local` file in the project root:

```bash
# OpenAI — AI clustering and summarization (required)
OPENAI_API_KEY=sk-proj-...
```

### 3. Start Development Server

```bash
make dev
```

This starts the Next.js app at `http://localhost:3000` with hot reload enabled.

### 4. Explore the Demo

The app comes pre-seeded with realistic data:

1. Open `http://localhost:3000` in your browser
2. Navigate to **Dashboard** → see 8 AI-clustered feedback groups
3. Click any **group card** → detail panel slides in with AI summary
4. Go to **Analytics** → view volume trends and severity breakdown
5. Try **Submit Feedback** → add new entries and trigger AI re-clustering

---

## 📦 Makefile Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start Next.js dev server (http://localhost:3000) |
| `make install` | Install all dependencies (npm install) |
| `make build` | Production build |
| `make start` | Start production server |
| `make lint` | Run ESLint |
| `make clean` | Remove .next and node_modules |

---

## 🔧 API Reference

All API routes are Next.js Route Handlers in `frontend/app/api/`.

### Feedback Groups

#### `GET /api/groups`
Returns all feedback groups with AI-generated summaries.

**Response:**
```json
[
  {
    "id": "group-001",
    "title": "Login Button Unresponsive on Mobile Safari",
    "summary": "Users report tapping login repeatedly with no response...",
    "severity": "critical",
    "entryCount": 12,
    "affectedUsers": 450,
    "category": "Authentication"
  }
]
```

#### `GET /api/groups/[id]`
Returns full group details including all raw feedback entries.

**Response:**
```json
{
  "id": "group-001",
  "title": "...",
  "aiSummary": {
    "problem": "The login button...",
    "impact": "450 users affected...",
    "suggestion": "Check touch event handlers...",
    "reproductionSteps": ["1. Open app on iPhone...", "2. Tap login..."]
  },
  "entries": [
    {
      "id": "entry-042",
      "text": "Can't login on my iPhone 15...",
      "timestamp": "2026-03-07T14:23:00Z",
      "screenshots": ["url1", "url2"]
    }
  ]
}
```

### Feedback Entries

#### `POST /api/entries`
Submit new feedback.

**Request Body:**
```json
{
  "text": "The search bar is broken on iPad",
  "category": "UI/UX",
  "userSegment": "premium",
  "screenshots": ["https://..."]
}
```

#### `GET /api/entries`
Returns all ungrouped feedback entries.

### Analytics

#### `GET /api/analytics`
Aggregated statistics for dashboard charts.

**Response:**
```json
{
  "totalEntries": 47,
  "totalGroups": 8,
  "severityDistribution": {
    "critical": 2,
    "high": 3,
    "medium": 2,
    "low": 1
  },
  "categoryBreakdown": {
    "UI/UX": 15,
    "Performance": 12,
    "Authentication": 8
  },
  "volumeTrend": [...]
}
```

### AI Pipeline

#### `POST /api/ai`
Trigger AI clustering and summarization for all ungrouped entries.

**Response:**
```json
{
  "status": "processing",
  "jobId": "ai-job-123"
}
```

#### `GET /api/ai/status`
Check AI processing status.

**Response:**
```json
{
  "status": "complete",
  "progress": 100,
  "newGroupsCreated": 3,
  "entriesProcessed": 12
}
```

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.tsx                         # Landing page
│   ├── layout.tsx                       # Root layout with providers
│   ├── dashboard/
│   │   ├── layout.tsx                   # Sidebar navigation shell
│   │   ├── page.tsx                     # Feedback groups grid
│   │   ├── analytics/page.tsx           # Charts and metrics
│   │   ├── submit/page.tsx              # Feedback submission form
│   │   └── reports/[reportId]/page.tsx  # Detail panel route
│   └── api/
│       ├── groups/
│       │   ├── route.ts                 # GET /api/groups
│       │   └── [id]/route.ts            # GET /api/groups/:id
│       ├── entries/route.ts             # POST + GET /api/entries
│       ├── analytics/route.ts           # GET /api/analytics
│       └── ai/
│           ├── route.ts                 # POST /api/ai
│           └── status/route.ts          # GET /api/ai/status
├── components/
│   ├── dashboard/
│   │   ├── CardGrid.tsx                 # Feedback group cards
│   │   ├── GroupCard.tsx                # Individual card component
│   │   └── StatsRow.tsx                 # Metrics display
│   ├── detail/
│   │   ├── DetailPanel.tsx              # Slide-in detail view
│   │   ├── SummaryView.tsx              # AI summary display
│   │   └── EntryList.tsx                # Raw feedback entries
│   ├── analytics/
│   │   ├── VolumeChart.tsx              # Time-series chart
│   │   ├── SeverityChart.tsx            # Pie chart
│   │   └── CategoryChart.tsx            # Bar chart
│   ├── layout/
│   │   ├── Header.tsx                   # Top navigation
│   │   └── Sidebar.tsx                  # Animated sidebar
│   └── ui/                              # shadcn/ui components
├── data/
│   ├── store.ts                         # In-memory data store
│   ├── groups.json                      # Pre-seeded groups (8)
│   └── entries.json                     # Pre-seeded entries (47)
├── services/
│   └── ai-pipeline.ts                   # OpenAI clustering + summarization
├── lib/
│   ├── api.ts                           # Client-side fetch helpers
│   ├── types.ts                         # Shared TypeScript interfaces
│   └── utils.ts                         # Utility functions
└── public/
    └── screenshots/                     # Feedback screenshot assets
```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | Next.js 16 (App Router) | Full-stack React with API routes, SSR, and streaming |
| Frontend | React 19 + TypeScript 5.8 | Type-safe UI components with concurrent rendering |
| Styling | Tailwind CSS 4 | Utility-first styling with JIT compilation |
| UI Components | shadcn/ui | Accessible Radix UI primitives with Tailwind |
| Charts | Recharts 2.15 | Composable charting library for analytics |
| Icons | Lucide React | Consistent, beautiful icon system |
| Animations | Framer Motion | Smooth transitions and interactions |
| Font | Geist Variable | Clean, modern variable font |
| AI | OpenAI GPT-4o-mini | Clustering, summarization, and structured outputs |
| State | In-Memory Store | Fast prototyping with JSON file persistence |
| Validation | Zod (optional) | Runtime type checking for API inputs |

---

## 🧠 Key Implementation Details

### Two-Stage AI Pipeline

Maisen uses a sophisticated two-phase approach:

**Phase 1: Clustering**
1. Extract text embeddings for all ungrouped feedback entries
2. Calculate cosine similarity matrix
3. Apply hierarchical clustering with dynamic threshold
4. Form groups based on semantic similarity (not keyword matching)

**Phase 2: Summarization**
For each cluster, GPT-4o-mini generates:
```json
{
  "problem": "Root cause analysis in 2-3 sentences",
  "impact": "Business impact and affected user count",
  "suggestion": "Concrete fix recommendations for engineers",
  "reproductionSteps": ["Step 1...", "Step 2...", "Step 3..."],
  "severity": "critical | high | medium | low"
}
```

### Severity Scoring Logic

AI considers:
• **User Count** — How many users reported this issue?
• **Sentiment** — Frustration level detected in text
• **Business Impact** — Premium users vs. free users
• **Frequency** — Recurring vs. one-time complaints

### Pre-Seeded Demo Data

The app includes production-quality seed data:
• **8 feedback groups** covering common UX pain points
• **47 raw entries** with realistic user complaints
• **Screenshots** demonstrating visual context
• Works 100% offline — no API key required for browsing

---

## 🧪 Example Usage

### Typical Workflow

```bash
# 1. User submits feedback
curl -X POST http://localhost:3000/api/entries \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Search results are completely broken on Chrome",
    "category": "Search",
    "userSegment": "free"
  }'

# 2. Trigger AI processing
curl -X POST http://localhost:3000/api/ai

# 3. Check status
curl http://localhost:3000/api/ai/status

# 4. Fetch updated groups
curl http://localhost:3000/api/groups
```

### Sample Prompts for Testing

```
"The login button doesn't work on my iPhone 15"
"App crashes every time I upload a photo"
"Search is super slow — takes 10+ seconds"
"Can't change my password — error message unclear"
"Dark mode doesn't apply to settings page"
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

Add your `OPENAI_API_KEY` in Vercel dashboard → Settings → Environment Variables.

### Deploy with Docker

```bash
# Build
docker build -t maisen .

# Run
docker run -p 3000:3000 -e OPENAI_API_KEY=sk-... maisen
```

---

## 👥 Team

**Maisen** — Built at c0mpiled Tokyo 2026 Hackathon (March 8, 2026)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

• [OpenAI](https://openai.com/) — GPT-4o-mini for intelligent clustering  
• [Vercel](https://vercel.com/) — Next.js framework and hosting  
• [shadcn](https://ui.shadcn.com/) — Beautiful UI component primitives  
• [Recharts](https://recharts.org/) — Composable charting library  
• [Lucide](https://lucide.dev/) — Icon system  
• [c0mpiled Tokyo 2026](https://c0mpiled.dev/) — Hackathon organizers

---

<div align="center">

**🌸 Maisen — From Chaos to Clarity in Seconds 🌸**

[🚀 Live Demo](#) | [📖 Documentation](#) | [🎬 Video Tour](#)

</div>
