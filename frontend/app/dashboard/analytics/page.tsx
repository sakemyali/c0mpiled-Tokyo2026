"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { Loader2, TrendingUp, BarChart3, Layers, AlertTriangle } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { fetchAnalytics, type AnalyticsData } from "@/lib/api";

const severityColors: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-emerald-500",
};

const severityTextColors: Record<string, string> = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-yellow-400",
  low: "text-emerald-400",
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

function AnimatedStat({
  value,
  label,
  icon: Icon,
  index,
  accent,
}: {
  value: number;
  label: string;
  icon: React.ElementType;
  index: number;
  accent?: boolean;
}) {
  const [displayed, setDisplayed] = useState(0);
  const spring = useSpring(0, { bounce: 0, duration: 800 });

  useEffect(() => {
    spring.set(value);
    const unsub = spring.on("change", (v) => setDisplayed(Math.round(v)));
    return unsub;
  }, [value, spring]);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={cn(
        "glass-card p-5 flex flex-col gap-3",
        accent && "border-emerald-500/20 glow-emerald"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          {label}
        </span>
        <Icon className={cn("h-4 w-4", accent ? "text-emerald-400" : "text-neutral-600")} />
      </div>
      <div className="font-mono text-3xl font-bold text-white tabular-nums">
        <NumberFlow value={displayed} />
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-sm text-red-400">
        Failed to load analytics.
      </div>
    );
  }

  const maxSeverity = Math.max(...data.severityDistribution.map((s) => s.count), 1);

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-neutral-500 mt-1.5">
          Aggregated insights across all feedback
        </p>
      </div>

      {/* Stat cards with animated numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AnimatedStat
          value={data.totalEntries}
          label="Total Entries"
          icon={TrendingUp}
          index={0}
        />
        <AnimatedStat
          value={data.totalGroups}
          label="Total Groups"
          icon={Layers}
          index={1}
        />
        <AnimatedStat
          value={data.severityDistribution.find((s) => s.severity === "critical")?.count ?? 0}
          label="Critical"
          icon={AlertTriangle}
          index={2}
          accent
        />
        <AnimatedStat
          value={data.severityDistribution.find((s) => s.severity === "high")?.count ?? 0}
          label="High"
          icon={BarChart3}
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Severity Distribution */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
            Severity Distribution
          </h2>
          <div className="space-y-3">
            {data.severityDistribution.map((item) => (
              <div key={item.severity} className="flex items-center gap-3">
                <span className="text-xs font-medium capitalize text-neutral-400 w-16">
                  {item.severity}
                </span>
                <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(4, (item.count / maxSeverity) * 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      severityColors[item.severity] ?? "bg-neutral-500"
                    )}
                  />
                </div>
                <span className={cn(
                  "font-mono text-sm font-semibold w-6 text-right tabular-nums",
                  severityTextColors[item.severity] ?? "text-neutral-400"
                )}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Categories */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
            Top Categories
          </h2>
          <div className="space-y-2.5">
            {data.categoryBreakdown.slice(0, 8).map((item, i) => (
              <div key={item.category} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-600 w-4">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {item.category}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-neutral-400 tabular-nums">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Impacted Areas */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="glass-card p-5 md:col-span-2"
        >
          <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
            Top Impacted Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {data.topImpactedAreas.map((area, i) => (
              <motion.div
                key={area.area}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-4 text-center hover:bg-white/[0.06] transition-colors"
              >
                <p className="font-mono text-2xl font-bold text-white">
                  {area.groupCount}
                </p>
                <p className="text-xs text-neutral-500 mt-1.5">
                  {area.area}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
