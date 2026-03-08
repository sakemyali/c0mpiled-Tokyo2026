"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  ListChecks,
  MessageSquareQuote,
  Sparkles,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { fetchGroup, type GroupDetail } from "@/lib/api";

const severityLabel: Record<string, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const severityColor: Record<string, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
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
      <main className="min-h-screen p-2 md:p-3 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </main>
    );
  }

  if (error || !group) {
    return (
      <main className="min-h-screen p-2 md:p-3 bg-neutral-50 dark:bg-neutral-950">
        <div className="rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            {error ? "Failed to load report" : "Report not found"}
          </h1>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</p>
          )}
          <Link href="/" className="text-sm underline text-neutral-700 dark:text-neutral-200">
            Back to reports
          </Link>
        </div>
      </main>
    );
  }

  const TrendIcon = trendIcon[group.trendDirection] ?? Minus;

  return (
    <main className="min-h-screen p-2 md:p-3 bg-neutral-50 dark:bg-neutral-950">
      <div className="rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-1.5rem)]">
        {/* Header */}
        <header className="border-b border-neutral-200 dark:border-neutral-700 px-5 py-4 md:px-7 md:py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Dashboard / Reports / Detail
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${severityColor[group.severity] ?? ""}`}
              >
                {severityLabel[group.severity] ?? group.severity}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                <TrendIcon className="h-3 w-3" />
                {group.trendDirection}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              {group.title}
            </h1>
            <p className="text-sm md:text-[15px] text-neutral-500 dark:text-neutral-400">
              {group.entryCount} reports &middot; {group.duplicateCount} duplicates &middot; Categories: {group.categories.join(", ")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 text-sm font-medium"
            >
              Back to reports
            </Link>
          </div>
        </header>

        {/* Content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-4 md:p-6">
          {/* Left column - AI Summary + User Feedback */}
          <section className="space-y-4">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4 space-y-3">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                AI Summary
              </h2>
              <p className="text-sm md:text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {group.aiSummary.problem}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                <div className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-2">
                  <p className="text-neutral-500 dark:text-neutral-400">Last reported</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">
                    {timeAgo(group.lastReported)}
                  </p>
                </div>
                <div className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-2">
                  <p className="text-neutral-500 dark:text-neutral-400">First reported</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">
                    {timeAgo(group.firstReported)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 inline-flex items-center gap-2">
                <MessageSquareQuote className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                User Feedback ({group.entries.length})
              </h2>
              <div className="max-h-[440px] overflow-y-auto pr-1">
                <ul className="space-y-2">
                  {group.entries.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-3"
                    >
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {entry.text}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                        by {entry.userName} &middot; {entry.source} &middot;{" "}
                        {timeAgo(entry.submittedAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Middle column - Reproduction Steps */}
          <section className="space-y-4">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 inline-flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                Reproduction Steps
              </h2>
              <ul className="space-y-2">
                {group.aiSummary.reproductionSteps.map((step, index) => (
                  <li
                    key={index}
                    className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-2"
                  >
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                      Step {index + 1}
                    </p>
                    <p className="text-sm text-neutral-800 dark:text-neutral-200">{step}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact section */}
            <div className="rounded-lg border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/20 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 pb-2 border-b border-blue-200/80 dark:border-blue-900/40 inline-flex items-center gap-2 w-full">
                <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Impact Assessment
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {group.aiSummary.impact}
              </p>
            </div>
          </section>

          {/* Right column - AI Suggestion */}
          <section className="space-y-4">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 pb-2 border-b border-emerald-200/80 dark:border-emerald-900/40 inline-flex items-center gap-2 w-full">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                AI Suggestion
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {group.aiSummary.suggestion}
              </p>
            </div>

            {/* Summary card */}
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4 space-y-3">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Quick Stats
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Total reports</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {group.entryCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Duplicates</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {group.duplicateCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Severity</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${severityColor[group.severity] ?? ""}`}
                  >
                    {group.severity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Trend</span>
                  <span className="inline-flex items-center gap-1 font-medium text-neutral-800 dark:text-neutral-200">
                    <TrendIcon className="h-3 w-3" />
                    {group.trendDirection}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Categories</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {group.categories.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
