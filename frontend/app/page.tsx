"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MessageSquareWarning,
  Brain,
  GitPullRequestArrow,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Store,
  Headphones,
  ClipboardList,
  Hash,
  MessagesSquare,
  Layers,
  Zap,
  Shield,
  Eye,
  FileText,
  ChevronRight,
  ArrowDown,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const scrollFade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ─── Section number badge ─── */
function SectionNum({ n }: { n: string }) {
  return (
    <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400/20 to-sky-400/20 border border-white/[0.08] text-[11px] font-bold font-mono text-emerald-400">
      {n}
    </span>
  );
}

/* ─── Pipeline node ─── */
function PipelineNode({
  icon: Icon,
  label,
  sublabel,
  delay,
  active,
}: {
  icon: React.ElementType;
  label: string;
  sublabel: string;
  delay: number;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div
        className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${
          active
            ? "bg-gradient-to-br from-emerald-400/20 to-sky-400/20 border border-emerald-400/30 shadow-lg shadow-emerald-500/10"
            : "bg-white/[0.04] border border-white/[0.08]"
        }`}
      >
        <Icon className={`h-6 w-6 ${active ? "text-emerald-400" : "text-neutral-500"}`} />
      </div>
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="text-[11px] text-neutral-600 mt-0.5">{sublabel}</span>
    </motion.div>
  );
}

/* ─── Pipeline arrow ─── */
function PipelineArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="hidden md:flex items-center justify-center flex-1 max-w-[80px]"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] via-white/[0.12] to-white/[0.06]" />
      <ChevronRight className="h-3 w-3 text-neutral-700 -ml-0.5" />
    </motion.div>
  );
}

/* ─── Animated mock dashboard ─── */
function DashboardPreview() {
  const mockCards = [
    { title: "Login fails on mobile Safari", severity: "critical", color: "bg-red-400", reports: 24 },
    { title: "Checkout totals mismatch", severity: "high", color: "bg-orange-400", reports: 18 },
    { title: "Dark mode text contrast", severity: "medium", color: "bg-yellow-400", reports: 12 },
    { title: "Search results slow to load", severity: "high", color: "bg-orange-400", reports: 9 },
  ];

  const mockStats = [
    { label: "Entries", value: "47", icon: MessageSquare },
    { label: "Groups", value: "8", icon: BarChart3 },
    { label: "Critical", value: "3", icon: AlertTriangle },
    { label: "Trending", value: "+12%", icon: TrendingUp },
  ];

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[var(--surface-1)] overflow-hidden shadow-2xl shadow-black/60">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-emerald-500/8 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="rounded-md bg-white/[0.04] px-12 py-1 text-[10px] text-neutral-600 font-mono">
            maisen.app/dashboard
          </div>
        </div>
        <div className="w-12" />
      </div>

      <div className="flex">
        <div className="hidden md:flex flex-col w-12 border-r border-white/[0.06] py-4 items-center gap-4">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-sky-400 opacity-80" />
          <div className="mt-4 flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded ${i === 0 ? "bg-white/20" : "bg-white/[0.06]"}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {mockStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-neutral-600 uppercase tracking-wider">{stat.label}</span>
                  <stat.icon className="h-2.5 w-2.5 text-neutral-700" />
                </div>
                <span className="text-sm font-bold text-white font-mono">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-2">
            {mockCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                className="rounded-lg bg-white/[0.02] border border-white/[0.06] px-3.5 py-2.5 flex items-center justify-between group hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-medium text-neutral-300 truncate">{card.title}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider ${card.color}/10`}>
                    <span className={`h-1 w-1 rounded-full ${card.color}`} />
                    <span className={`${card.color.replace("bg-", "text-")}`}>{card.severity}</span>
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono flex-shrink-0">{card.reports} reports</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="grid grid-cols-2 gap-2"
          >
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 space-y-2">
              <span className="text-[9px] text-neutral-600 uppercase tracking-wider">Severity</span>
              <div className="space-y-1.5">
                {[
                  { w: "75%", color: "bg-red-500" },
                  { w: "55%", color: "bg-orange-500" },
                  { w: "35%", color: "bg-yellow-500" },
                  { w: "20%", color: "bg-emerald-500" },
                ].map((bar, i) => (
                  <motion.div key={i} className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: bar.w }}
                      transition={{ delay: 2 + i * 0.1, duration: 0.6, ease: "easeOut" as const }}
                      className={`h-full rounded-full ${bar.color}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 space-y-2">
              <span className="text-[9px] text-neutral-600 uppercase tracking-wider">AI Suggestion</span>
              <div className="flex items-start gap-2">
                <Sparkles className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-neutral-500 leading-relaxed">
                  Implement WebSocket reconnection with exponential backoff to resolve mobile Safari session drops...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)] text-white overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* ──── NAV ──── */}
      <nav className="relative flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
            <span className="text-[13px] font-extrabold text-[var(--surface-0)] leading-none">M</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Maisen</span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="#docs"
            className="hidden md:inline text-sm text-neutral-500 hover:text-white transition-colors"
          >
            Documentation
          </a>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Open Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* ──── HERO ──── */}
      <section className="relative px-6 md:px-12 pt-20 pb-16 md:pt-32 md:pb-24 max-w-5xl mx-auto text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-neutral-400 mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          AI-powered feedback intelligence
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Turn scattered feedback into{" "}
          <span className="gradient-text">actionable insights</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-6 text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed"
        >
          Maisen clusters user feedback with AI, surfaces critical issues, and
          gives your team clear reproduction steps and fix suggestions — all in
          one dashboard.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-3 text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-[0.98]"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#docs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-neutral-300 hover:bg-white/[0.06] hover:text-white transition-all"
          >
            Read the Docs
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div custom={4} initial="hidden" animate="visible" variants={fade} className="mt-16">
          <DashboardPreview />
        </motion.div>
      </section>

      {/* ──── HOW IT WORKS ──── */}
      <section className="relative px-6 md:px-12 py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 tracking-tight">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: MessageSquareWarning,
                title: "Collect feedback",
                description:
                  "Ingest user feedback from app stores, support tickets, surveys, Slack, and Intercom into a single pipeline.",
              },
              {
                icon: Brain,
                title: "AI clusters & summarizes",
                description:
                  "GPT-4 groups similar reports, identifies root causes, scores severity, and writes reproduction steps.",
              },
              {
                icon: GitPullRequestArrow,
                title: "Ship fixes faster",
                description:
                  "Review prioritized issue cards with AI suggestions and export directly to your issue tracker.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i + 5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="glass-card p-6 hover:border-white/[0.15]"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DOCUMENTATION SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="docs" className="relative border-t border-white/[0.06] scroll-mt-8">
        {/* Section ambient glow */}
        <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/[0.04] via-sky-500/[0.02] to-transparent rounded-full blur-[100px] pointer-events-none" />

        {/* Docs header */}
        <div className="relative px-6 md:px-12 pt-20 pb-8 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFade}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-neutral-400 mb-6">
              <FileText className="h-3.5 w-3.5 text-sky-400" />
              Documentation
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Everything you need to know
            </h2>
            <p className="mt-4 text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
              A complete guide to understanding Maisen&apos;s feedback intelligence platform — from ingestion to actionable insights.
            </p>
          </motion.div>
        </div>

        {/* ── 01 · What is Maisen ── */}
        <div className="relative px-6 md:px-12 py-16 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFade}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 items-start"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <SectionNum n="01" />
                <h3 className="text-xl font-bold text-white tracking-tight">What is Maisen?</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                Maisen is a <span className="text-white font-medium">feedback intelligence platform</span> that transforms raw user feedback into structured, prioritized issue reports using AI.
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Instead of manually reading hundreds of support tickets, app reviews, and Slack messages, Maisen automatically clusters similar feedback, identifies root causes, assigns severity levels, and even suggests fixes — giving product teams a clear action plan.
              </p>
            </div>

            {/* Key capabilities grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Layers, label: "Smart Clustering", desc: "Groups similar feedback by underlying problem" },
                { icon: AlertTriangle, label: "Severity Scoring", desc: "AI assigns critical / high / medium / low" },
                { icon: Eye, label: "Reproduction Steps", desc: "Auto-generates steps to reproduce each issue" },
                { icon: Zap, label: "Fix Suggestions", desc: "Actionable AI recommendations for each cluster" },
                { icon: Shield, label: "Impact Assessment", desc: "Understands how many users are affected" },
                { icon: TrendingUp, label: "Trend Detection", desc: "Tracks if issues are growing or stabilizing" },
              ].map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 hover:bg-white/[0.04] transition-colors"
                >
                  <cap.icon className="h-4 w-4 text-emerald-400 mb-2.5" />
                  <p className="text-[13px] font-semibold text-white mb-1">{cap.label}</p>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── 02 · The Pipeline ── */}
        <div className="relative px-6 md:px-12 py-16 max-w-5xl mx-auto border-t border-white/[0.04]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFade}
          >
            <div className="flex items-center gap-3 mb-3">
              <SectionNum n="02" />
              <h3 className="text-xl font-bold text-white tracking-tight">The Pipeline</h3>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-10 max-w-xl">
              Feedback flows through four stages — from raw ingestion to a polished, prioritized dashboard your team can act on immediately.
            </p>

            {/* Pipeline visualization */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0 mb-10">
              <PipelineNode icon={MessageSquare} label="Ingest" sublabel="5 sources" delay={0.1} />
              <PipelineArrow delay={0.2} />
              <PipelineNode icon={Brain} label="Cluster" sublabel="GPT-4o-mini" delay={0.3} active />
              <PipelineArrow delay={0.4} />
              <PipelineNode icon={AlertTriangle} label="Score" sublabel="Severity + trend" delay={0.5} active />
              <PipelineArrow delay={0.6} />
              <PipelineNode icon={Sparkles} label="Summarize" sublabel="Steps + fix" delay={0.7} active />
              <PipelineArrow delay={0.8} />
              <PipelineNode icon={BarChart3} label="Dashboard" sublabel="Act on it" delay={0.9} />
            </div>

            {/* Pipeline detail cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-5 space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <Brain className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">AI Clustering</span>
                </div>
                <p className="text-[13px] text-neutral-400 leading-relaxed">
                  Maisen sends all ungrouped feedback entries to GPT-4o-mini with a specialized prompt. The model analyzes semantic similarity and groups entries by their underlying problem — not just keyword matching, but true intent understanding.
                </p>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-2">Example output</p>
                  <code className="text-[11px] text-emerald-400/80 font-mono leading-relaxed block">
                    {`{`}<br />
                    &nbsp;&nbsp;{`"title": "Mobile Safari Auth Failures",`}<br />
                    &nbsp;&nbsp;{`"entryIndices": [0, 3, 12, 18, 24],`}<br />
                    &nbsp;&nbsp;{`"categories": ["Auth", "Mobile"]`}<br />
                    {`}`}
                  </code>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="glass-card p-5 space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-sky-400" />
                  <span className="text-sm font-semibold text-white">AI Summarization</span>
                </div>
                <p className="text-[13px] text-neutral-400 leading-relaxed">
                  Each cluster gets a second AI pass that generates: a concise problem description, user impact assessment, step-by-step reproduction instructions, and an actionable fix suggestion — all formatted for your engineering team.
                </p>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-2">Generated fields</p>
                  <div className="space-y-1.5">
                    {["problem", "impact", "reproductionSteps[]", "suggestion", "severity"].map((field) => (
                      <div key={field} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-sky-400/60" />
                        <code className="text-[11px] text-sky-400/70 font-mono">{field}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── 03 · Supported Sources ── */}
        <div className="relative px-6 md:px-12 py-16 max-w-5xl mx-auto border-t border-white/[0.04]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFade}
          >
            <div className="flex items-center gap-3 mb-3">
              <SectionNum n="03" />
              <h3 className="text-xl font-bold text-white tracking-tight">Supported Sources</h3>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-xl">
              Maisen aggregates feedback from five distinct channels into a unified pipeline. Each entry preserves its source, timestamp, and author.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { icon: Store, name: "App Store", desc: "iOS & Android reviews" },
                { icon: Headphones, name: "Support Tickets", desc: "Helpdesk conversations" },
                { icon: ClipboardList, name: "Surveys", desc: "NPS & CSAT responses" },
                { icon: Hash, name: "Slack", desc: "Team-reported issues" },
                { icon: MessagesSquare, name: "Intercom", desc: "Live chat transcripts" },
              ].map((source, i) => (
                <motion.div
                  key={source.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="glass-card p-4 text-center hover:border-emerald-500/20 group"
                >
                  <source.icon className="h-5 w-5 text-neutral-600 group-hover:text-emerald-400 transition-colors mx-auto mb-3" />
                  <p className="text-[13px] font-semibold text-white mb-0.5">{source.name}</p>
                  <p className="text-[11px] text-neutral-600">{source.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── 04 · Dashboard Views ── */}
        <div className="relative px-6 md:px-12 py-16 max-w-5xl mx-auto border-t border-white/[0.04]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFade}
          >
            <div className="flex items-center gap-3 mb-3">
              <SectionNum n="04" />
              <h3 className="text-xl font-bold text-white tracking-tight">Dashboard Views</h3>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-xl">
              Three purpose-built views give your team everything they need — from a high-level overview to detailed drill-downs and new feedback submission.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Reports */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-5 space-y-4 group"
              >
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 transition-all">
                  <FileText className="h-5 w-5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-white mb-1.5">Reports</h4>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    Browse all AI-clustered issue groups in a single feed. Each card shows the problem title, severity badge, AI summary excerpt, report count, and categories. Click through for the full drill-down.
                  </p>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
                  {["Critical: Login fails on Safari", "High: Checkout totals mismatch"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
                      <span className="text-[11px] text-neutral-500 font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-5 space-y-4 group"
              >
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-sky-400/30 group-hover:bg-sky-400/10 transition-all">
                  <BarChart3 className="h-5 w-5 text-neutral-500 group-hover:text-sky-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-white mb-1.5">Analytics</h4>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    Animated stat counters, severity distribution bars, top categories, and impacted areas — all rendered with live data. Spot patterns at a glance and understand where your users hurt most.
                  </p>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 space-y-1.5">
                  {[
                    { label: "Critical", w: "w-3/4", color: "bg-red-500" },
                    { label: "High", w: "w-1/2", color: "bg-orange-500" },
                    { label: "Medium", w: "w-1/3", color: "bg-yellow-500" },
                  ].map((bar) => (
                    <div key={bar.label} className="flex items-center gap-2">
                      <span className="text-[9px] text-neutral-600 w-10">{bar.label}</span>
                      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${bar.color} ${bar.w}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Report Detail */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-card p-5 space-y-4 group"
              >
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 transition-all">
                  <Sparkles className="h-5 w-5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-white mb-1.5">Report Detail</h4>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    Deep-dive into any issue cluster. Three-column layout shows the AI summary with timestamps, numbered reproduction steps, impact assessment, AI fix suggestion, and every original user feedback entry.
                  </p>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[11px] text-neutral-500 italic leading-relaxed">
                      &ldquo;Add retry logic with exponential backoff to the WebSocket reconnection handler...&rdquo;
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── 05 · Getting Started ── */}
        <div className="relative px-6 md:px-12 py-16 max-w-5xl mx-auto border-t border-white/[0.04]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFade}
          >
            <div className="flex items-center gap-3 mb-3">
              <SectionNum n="05" />
              <h3 className="text-xl font-bold text-white tracking-tight">Getting Started</h3>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-xl">
              Go from zero to clustered insights in three steps.
            </p>

            <div className="space-y-4 max-w-2xl">
              {[
                {
                  step: "1",
                  title: "Submit or import feedback",
                  desc: "Use the Submit form to add feedback manually, or connect your existing sources. Each entry records the user name, feedback text, source channel, and timestamp.",
                  code: "POST /api/entries { text, source, userName }",
                },
                {
                  step: "2",
                  title: "Run the AI pipeline",
                  desc: "Trigger the clustering engine. Maisen sends your entries to GPT-4o-mini, which groups them by problem, scores severity, and generates summaries with reproduction steps.",
                  code: "POST /api/ai → clusters + summarizes all ungrouped entries",
                },
                {
                  step: "3",
                  title: "Review & act",
                  desc: "Open the Reports view to see prioritized issue cards. Drill into any cluster for the full AI analysis, then share or export the fix suggestion to your team's issue tracker.",
                  code: "GET /dashboard → Browse → Click report → Ship the fix",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400/20 to-sky-400/20 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold font-mono text-emerald-400">{item.step}</span>
                    </div>
                    {i < 2 && <div className="w-px flex-1 bg-white/[0.06] mt-2" />}
                  </div>
                  <div className="pb-6">
                    <h4 className="text-[15px] font-semibold text-white mb-1.5">{item.title}</h4>
                    <p className="text-[13px] text-neutral-500 leading-relaxed mb-3">{item.desc}</p>
                    <div className="inline-flex items-center rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
                      <code className="text-[11px] text-emerald-400/70 font-mono">{item.code}</code>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA banner */}
        <div className="relative px-6 md:px-12 py-16 max-w-5xl mx-auto border-t border-white/[0.04]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFade}
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-sky-500/[0.06] pointer-events-none" />

            <h3 className="relative text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              Ready to tame your feedback?
            </h3>
            <p className="relative text-sm text-neutral-500 max-w-md mx-auto mb-6 leading-relaxed">
              Open the dashboard now to see AI-clustered feedback reports, analytics, and actionable fix suggestions.
            </p>
            <Link
              href="/dashboard"
              className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-3 text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-[0.98]"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ──── FOOTER ──── */}
      <footer className="relative border-t border-white/[0.06] px-6 md:px-12 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gradient-to-br from-emerald-400 to-sky-400 opacity-40 flex items-center justify-center">
              <span className="text-[7px] font-extrabold text-[var(--surface-0)] leading-none">M</span>
            </div>
            <span>Maisen</span>
          </div>
          <span>Built for c0mpiled Tokyo 2026</span>
        </div>
      </footer>
    </div>
  );
}
