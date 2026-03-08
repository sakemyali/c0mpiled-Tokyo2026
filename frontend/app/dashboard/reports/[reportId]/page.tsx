"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ListChecks,
  MessageSquareQuote,
  Sparkles,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowLeft,
  Hash,
  Copy,
  Layers,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchGroup, type GroupDetail } from "@/lib/api";

const severityConfig: Record<string, { bg: string; text: string; dot: string }> = {
  critical: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  high: { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  medium: { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
  low: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
};

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ReportDetailPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;
    fetchGroup(reportId)
      .then(setGroup)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-600" />
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-white mb-3">
          {error ? "Failed to load report" : "Report not found"}
        </h1>
        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
        <Link
          href="/dashboard"
          className="text-sm text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
        >
          Back to reports
        </Link>
      </div>
    );
  }

  const TrendIcon = trendIcon[group.trendDirection] ?? Minus;
  const severity = severityConfig[group.severity] ?? severityConfig.medium;

  return (
    <>
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-5 md:px-8 md:py-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Reports
        </Link>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase",
                severity.bg,
                severity.text
              )}
            >
              <span className={cn("h-1 w-1 rounded-full", severity.dot)} />
              {group.severity}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
              <TrendIcon className="h-3 w-3" />
              {group.trendDirection}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {group.title}
          </h1>
          <p className="text-sm text-neutral-500">
            <span className="font-mono">{group.entryCount}</span> reports &middot;{" "}
            <span className="font-mono">{group.duplicateCount}</span> duplicates &middot;{" "}
            {group.categories.join(", ")}
          </p>
        </div>
      </header>

      {/* Content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-5 md:p-7">
        {/* Left Column */}
        <section className="space-y-4">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass-card p-5 space-y-4"
          >
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              AI Summary
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {group.aiSummary.problem}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-neutral-600 mb-1">
                  <Clock className="h-3 w-3" />
                  <p className="text-[10px] uppercase tracking-wider">Last reported</p>
                </div>
                <p className="text-sm font-medium text-white font-mono">
                  {timeAgo(group.lastReported)}
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-neutral-600 mb-1">
                  <Clock className="h-3 w-3" />
                  <p className="text-[10px] uppercase tracking-wider">First reported</p>
                </div>
                <p className="text-sm font-medium text-white font-mono">
                  {timeAgo(group.firstReported)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass-card p-5"
          >
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 inline-flex items-center gap-2">
              <MessageSquareQuote className="h-4 w-4 text-neutral-500" />
              User Feedback ({group.entries.length})
            </h2>
            <div className="max-h-[420px] overflow-y-auto pr-1 space-y-2">
              {group.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 hover:bg-white/[0.04] transition-colors"
                >
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {entry.text}
                  </p>
                  <p className="text-[11px] text-neutral-600 mt-2 font-mono">
                    {entry.userName} &middot; {entry.source} &middot; {timeAgo(entry.submittedAt)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Middle Column */}
        <section className="space-y-4">
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass-card p-5"
          >
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 inline-flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-neutral-500" />
              Reproduction Steps
            </h2>
            <div className="space-y-2">
              {group.aiSummary.reproductionSteps.map((step, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 flex gap-3"
                >
                  <span className="font-mono text-xs text-emerald-400/60 font-semibold mt-0.5 flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-neutral-300">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass-card p-5 border-sky-500/20 glow-sky"
          >
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 pb-3 border-b border-white/[0.06] inline-flex items-center gap-2 w-full">
              <AlertTriangle className="h-4 w-4 text-sky-400" />
              Impact Assessment
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {group.aiSummary.impact}
            </p>
          </motion.div>
        </section>

        {/* Right Column */}
        <section className="space-y-4">
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass-card p-5 border-emerald-500/20 glow-emerald"
          >
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 pb-3 border-b border-white/[0.06] inline-flex items-center gap-2 w-full">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              AI Suggestion
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {group.aiSummary.suggestion}
            </p>
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass-card p-5"
          >
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Stats
            </h2>
            <div className="space-y-3">
              {[
                { label: "Total reports", value: String(group.entryCount), icon: Hash },
                { label: "Duplicates", value: String(group.duplicateCount), icon: Copy },
                {
                  label: "Severity",
                  value: group.severity,
                  icon: AlertTriangle,
                  badge: true,
                },
                {
                  label: "Trend",
                  value: group.trendDirection,
                  icon: TrendIcon,
                },
                { label: "Categories", value: group.categories.join(", "), icon: Layers },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <stat.icon className="h-3.5 w-3.5 text-neutral-600" />
                    <span className="text-xs text-neutral-500">{stat.label}</span>
                  </div>
                  {stat.badge ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        severity.bg,
                        severity.text
                      )}
                    >
                      <span className={cn("h-1 w-1 rounded-full", severity.dot)} />
                      {stat.value}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-white font-mono capitalize">
                      {stat.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
