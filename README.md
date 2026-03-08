# 🌸 Maisen

> **AI-Powered Feedback Intelligence Platform**  
> Transform scattered user feedback into actionable product insights in seconds, not hours.

[![Built with React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Powered by OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?logo=openai&logoColor=white)](https://openai.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white)](https://expressjs.com/)

---

## 🎯 The Problem

Product teams drown in feedback. User complaints flood in from support tickets, user interviews, analytics events, and bug reports—all scattered, unstructured, and impossible to prioritize. PMs spend **hours manually reading, categorizing, and clustering feedback** to identify what matters most. By the time insights emerge, the moment to act has passed.

**What if AI could do this in seconds?**

## ✨ The Solution

**Maisen** (舞仙 - "dancing sage") is an intelligent feedback compiler that automatically:

- 🧠 **Clusters similar feedback** using advanced AI to identify underlying problems across thousands of entries
- 📊 **Generates executive summaries** with problem statements, impact analysis, and improvement suggestions
- 🎬 **Captures session replays** showing exactly what users experienced (via rrweb integration)
- 📸 **Links contextual screenshots** to every feedback entry for visual verification
- 🔍 **Categorizes and prioritizes** with AI-determined severity scores and affected user segments
- 📈 **Visualizes trends** through interactive analytics dashboards and relationship graphs

### Why Maisen?

| Traditional Approach | Maisen Approach |
|---------------------|-----------------|
| ⏰ 4-6 hours of manual reading | ⚡ 30 seconds of AI processing |
| 📝 Spreadsheet chaos | 🎨 Beautiful, searchable dashboard |
| 🤷 Subjective prioritization | 🎯 Data-driven severity scoring |
| 🔗 Lost context | 🎬 Session replay + screenshots |
| 📉 Insights arrive too late | 🚀 Real-time clustering |

---

## 🚀 Key Features

### ✅ Implemented

#### **Intelligent Dashboard**
- **Smart Grouping**: AI-clustered feedback groups displayed as interactive glass-morphism cards
- **At-a-Glance Metrics**: Real-time stats showing total feedback volume, group count, and severity distribution
- **PM Insights Panel**: High-priority recommendations surfaced automatically for immediate action
- **Severity Indicators**: Color-coded badges (Critical, High, Medium, Low) with visual impact hierarchy

#### **Deep-Dive Detail Panel**
- **Slide-in Panel Architecture**: Smooth transitions for drilling into individual feedback groups
- **AI-Generated Summaries**: 
  - Problem statement with root cause analysis
  - Business impact assessment
  - Actionable improvement suggestions
  - Step-by-step reproduction instructions
- **Raw Feedback Explorer**: Browse all clustered entries with timestamps and user metadata
- **Screenshot Gallery**: Contextual images with lightbox expansion and annotations
- **Entry Metadata**: User segments, timestamps, categories, and submission context

#### **Analytics & Insights**
- **Volume Trends**: Time-series chart showing feedback flow patterns
- **Severity Distribution**: Pie chart breaking down critical vs. minor issues
- **Category Breakdown**: Bar chart revealing top affected areas (UI/UX, Performance, etc.)
- **Top Impact Table**: Ranked list of feedback groups by user reach and severity
- **Exportable Data**: One-click CSV/JSON exports for stakeholder reporting

#### **Visual Polish**
- **Dark Theme UI**: Sleek, modern interface optimized for long analysis sessions
- **Glass-Morphism Design**: Frosted glass cards with backdrop blur for premium feel
- **Responsive Layout**: Adapts seamlessly from mobile to 4K displays
- **Smooth Animations**: Framer Motion transitions for delightful interactions
- **Lucide Icons**: Consistent, professional iconography throughout

### 🔄 In Progress / Planned

#### **Live Feedback Submission** (Phase 2 ✅ Backend Complete)
- Web form with rich text input and attachment support
- Real-time validation and instant submission feedback
- Automatic screenshot capture from user viewport
- Optional session recording trigger (rrweb integration)

#### **AI Processing Pipeline** (Phase 2 ✅ Backend Complete)
- Two-stage AI pipeline:
  1. **Clustering**: GPT-4 embeddings + semantic similarity for grouping
  2. **Summarization**: GPT-4 Turbo generates structured insights per group
- Configurable processing triggers (auto vs. manual)
- Progress indicators with estimated time remaining

#### **Session Replay** (Phase 3 🚧)
- **rrweb Integration**: Record and playback user sessions frame-by-frame
- **Event Timeline**: Scrub through user actions with annotated timestamps
- **Fallback Mode**: Annotated screenshot gallery when replay unavailable
- **Privacy Controls**: Selective masking for sensitive data

#### **Relationship Graph** (Phase 3 🚧)
- **3D Force-Directed Graph**: Interactive D3.js/Three.js visualization
- **Node Details**: Feedback groups as nodes sized by impact
- **Edge Relationships**: Connections show shared users or similar issues
- **Zoom & Pan**: Explore complex feedback landscapes intuitively

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Latest features with concurrent rendering
- **TypeScript 5.9** - Type-safe development
- **Vite 7** - Lightning-fast build tooling
- **React Router 7** - Modern routing with data loading
- **Tailwind CSS 4** - Utility-first styling with JIT compilation
- **shadcn/ui** - Accessible component primitives
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon system
- **Geist Font** - Variable font for crisp typography

### Backend
- **Express 5** - Minimal, flexible Node.js server
- **TypeScript 5.8** - Consistent typing across stack
- **OpenAI API 6.27** - GPT-4 & GPT-4 Turbo integration
- **CORS** - Cross-origin resource sharing
- **tsx** - TypeScript execution and hot-reload

### Infrastructure
- **In-Memory Store** - Fast prototyping with JSON file persistence
- **REST API** - Simple, predictable endpoints
- **Concurrent Dev Servers** - Client/server hot-reload with concurrently

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │  Analytics   │  │ Detail Panel │     │
│  │   - Cards    │  │   - Charts   │  │  - Summary   │     │
│  │   - Stats    │  │   - Metrics  │  │  - Entries   │     │
│  │   - Insights │  │   - Tables   │  │  - Gallery   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         └────────────┬────────────────────┘               │
│                      │ API Client                          │
└──────────────────────┼─────────────────────────────────────┘
                       │ REST API (JSON)
┌──────────────────────┼─────────────────────────────────────┐
│                      │ Express Server                       │
│         ┌────────────▼────────────┐                        │
│         │   Routes & Controllers   │                        │
│         │  - /api/groups           │                        │
│         │  - /api/entries          │                        │
│         │  - /api/analytics        │                        │
│         └────────────┬────────────┘                        │
│                      │                                      │
│         ┌────────────▼────────────┐                        │
│         │    AI Pipeline Engine    │                        │
│         │  - Clustering Model      │                        │
│         │  - Summarization Model   │                        │
│         │  - Severity Scoring      │                        │
│         └────────────┬────────────┘                        │
│                      │                                      │
│         ┌────────────▼────────────┐                        │
│         │   Data Store (JSON)      │                        │
│         │  - groups.json           │                        │
│         │  - entries.json          │                        │
│         │  - sessions/*.json       │                        │
│         └──────────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────────────┐
│                  OpenAI API (GPT-4)                         │
│  - Embeddings for semantic clustering                       │
│  - Chat completions for summarization                       │
│  - Structured output generation                             │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Feedback Submission**: User submits feedback → Server stores raw entry
2. **AI Processing Trigger**: Manual or automatic → Batch processes all feedback
3. **Clustering**: OpenAI embeddings calculate similarity → Groups formed
4. **Summarization**: GPT-4 analyzes each group → Structured insights generated
5. **Dashboard Update**: Frontend polls/refreshes → New groups displayed
6. **Detail Exploration**: User clicks group → Detail panel with full context

---

## 📸 Screenshots

> **Note**: Screenshots stored in `client/public/screenshots/` directory

### Dashboard
![Dashboard Overview](./client/public/screenshots/dashboard-overview.png)
*AI-clustered feedback groups with severity indicators and PM insights*

### Detail Panel
![Detail Panel](./client/public/screenshots/detail-panel.png)
*Deep dive into a feedback group with AI summary and raw entries*

### Analytics
![Analytics Dashboard](./client/public/screenshots/analytics.png)
*Volume trends, severity distribution, and category breakdown*

---

## 🏃 Getting Started

### Prerequisites
- **Node.js 18+** (recommended: 20 LTS)
- **npm 9+** or **pnpm 8+**
- **OpenAI API Key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd c0mpiled-Tokyo2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

3. **Configure environment**
   ```bash
   # Server configuration
   cd server
   cp .env.example .env
   # Add your OpenAI API key to .env:
   # OPENAI_API_KEY=sk-...
   ```

4. **Start development servers**
   ```bash
   # From project root - runs both client and server
   npm run dev
   ```

   Or run individually:
   ```bash
   # Terminal 1 - Frontend (http://localhost:5173)
   npm run dev:client

   # Terminal 2 - Backend (http://localhost:3000)
   npm run dev:server
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Seed Data

The app includes pre-seeded feedback groups for demo purposes:
- **8 feedback groups** covering common UX issues
- **40+ raw feedback entries** with realistic user complaints
- **Screenshots** demonstrating visual context
- **2 sample sessions** with mock replay data

To reset/regenerate seed data:
```bash
cd server
npm run seed  # If seed script exists
```

---

## 🎮 Usage Guide

### Exploring the Dashboard

1. **Browse Feedback Groups**: Scroll through clustered feedback cards
2. **Check Severity**: Note the color-coded badges (red=critical, yellow=high, etc.)
3. **Read PM Insights**: Top section highlights urgent action items
4. **Monitor Stats**: Track total feedback volume and group distribution

### Analyzing Details

1. **Click Any Group Card**: Opens detail panel from the right
2. **Read AI Summary**: Problem statement, impact, and suggestions
3. **Review Reproduction Steps**: Follow the technical walkthrough
4. **Browse Raw Entries**: See individual user feedback that forms the cluster
5. **View Screenshots**: Click thumbnails to expand in lightbox
6. **Close Panel**: Click X or outside the panel to return

### Viewing Analytics

1. **Navigate to Analytics Tab**: Top navigation bar
2. **Explore Charts**:
   - Volume over time (trend line)
   - Severity breakdown (pie chart)
   - Category distribution (bar chart)
3. **Check Top Impact Table**: Ranked list of most critical issues

### Submitting Feedback (Phase 2 🚧)

1. **Navigate to Submit Tab**: Top navigation bar
2. **Fill Out Form**:
   - Feedback text (required)
   - Category dropdown
   - Severity self-assessment
   - Optional screenshot upload
3. **Submit**: Feedback added to processing queue
4. **Trigger AI Processing**: Re-cluster to see your feedback grouped

---

## 🧪 Demo Flow

Perfect for hackathon presentations:

1. **Open Dashboard** → "Here's our AI-powered feedback intelligence platform"
2. **Highlight Stats** → "We've processed 47 feedback entries into 8 actionable groups"
3. **Point to PM Insights** → "AI automatically surfaces top priorities"
4. **Click a Critical Group** → "Let's drill into this login failure issue"
5. **Show AI Summary** → "GPT-4 analyzed 6 related complaints and generated this structured report"
6. **Scroll Through Entries** → "Here are the raw user submissions that fed the analysis"
7. **Open Screenshot** → "We capture visual context for every piece of feedback"
8. **Go to Analytics** → "Here's how feedback trends over time with severity breakdown"
9. **Submit New Feedback** → "Anyone can submit feedback in seconds"
10. **Trigger AI Reprocess** → "Watch as AI re-clusters and updates the dashboard live"

**Total Demo Time**: ~3-4 minutes

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅ Complete
- [x] Express API with seed data
- [x] React frontend with routing
- [x] Dashboard UI with group cards
- [x] Detail panel with summaries
- [x] Analytics page with charts
- [x] Screenshot gallery
- [x] Dark theme polish

### Phase 2: AI Pipeline ✅ Complete (Backend)
- [x] In-memory data store
- [x] OpenAI integration
- [x] Two-stage AI pipeline (clustering + summarization)
- [x] Severity scoring algorithm
- [ ] Frontend: Feedback submission form
- [ ] Frontend: AI processing trigger UI

### Phase 3: Enhancements 🚧 Planned
- [ ] rrweb session replay integration
- [ ] D3.js relationship graph visualization
- [ ] Export to Jira/Linear/GitHub Issues
- [ ] Real-time WebSocket updates
- [ ] Multi-language support (Japanese, English)
- [ ] Advanced filtering and search
- [ ] Team collaboration features
- [ ] Custom AI model fine-tuning

### Future Vision 🔮
- **Enterprise Features**: SSO, RBAC, audit logs
- **Integrations**: Zendesk, Intercom, Slack, Notion
- **Mobile App**: Native iOS/Android feedback capture
- **Voice Feedback**: Speech-to-text with sentiment analysis
- **Predictive Analytics**: Forecast churn risk from feedback patterns
- **A/B Test Insights**: Link feedback to experiment variants

---

## 🏆 Built for Tokyo 2026 Hackathon

**Event**: c0mpiled Tokyo 2026  
**Date**: March 8, 2026  
**Theme**: AI-Powered Developer Tools  
**Build Time**: 3 hours  
</div>
