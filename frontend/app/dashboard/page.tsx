"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowUpRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchGroups, type FeedbackGroup } from "@/lib/api";

const severityConfig: Record<string, { bg: string; text: string; dot: string }> = {
  critical: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    dot: "bg-red-400",
  },
  high: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    dot: "bg-orange-400",
  },
  medium: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    dot: "bg-yellow-400",
  },
  low: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function DashboardPage() {
  const [groups, setGroups] = useState<FeedbackGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups()
      .then(setGroups)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Feedback Reports
          </h1>
          <p className="text-sm text-neutral-500 mt-1.5">
            {loading
              ? "Loading..."
              : `${groups.length} clustered issues from your active user base`}
          </p>
        </div>
        {!loading && groups.length > 0 && (
          <div className="hidden md:flex items-center gap-3">
            {Object.entries(
              groups.reduce((acc, g) => {
                acc[g.severity] = (acc[g.severity] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([severity, count]) => {
              const config = severityConfig[severity] ?? severityConfig.medium;
              return (
                <div
                  key={severity}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                    config.bg
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
                  <span className={cn("text-xs font-medium capitalize", config.text)}>
                    {count} {severity}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="glass-card flex items-center gap-3 p-4 border-red-500/20">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">Failed to load reports: {error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-600" />
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3">
        {groups.map((group, i) => {
          const config = severityConfig[group.severity] ?? severityConfig.medium;
          return (
            <motion.div
              key={group.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Link
                href={`/dashboard/reports/${group.id}`}
                className="group block glass-card p-5 hover:border-white/[0.15]"
              >
                <div className="flex flex-col gap-3">
                  {/* Title row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[15px] font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {group.title}
                      </h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                          config.bg,
                          config.text
                        )}
                      >
                        <span className={cn("h-1 w-1 rounded-full", config.dot)} />
                        {group.severity}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                    {group.summary}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                      <span className="font-mono">{group.entryCount} reports</span>
                      <span>{group.categories.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
