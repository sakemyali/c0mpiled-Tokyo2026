"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { fetchAnalytics, type AnalyticsData } from "@/lib/api";

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
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-sm text-red-600 dark:text-red-400">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Analytics
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
          Aggregated insights across all feedback
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Entries" value={data.totalEntries} />
        <StatCard label="Total Groups" value={data.totalGroups} />
        <StatCard
          label="Critical"
          value={data.severityDistribution.find((s) => s.severity === "critical")?.count ?? 0}
        />
        <StatCard
          label="High"
          value={data.severityDistribution.find((s) => s.severity === "high")?.count ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Severity */}
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            Severity Distribution
          </h2>
          <div className="space-y-2">
            {data.severityDistribution.map((item) => (
              <div key={item.severity} className="flex items-center gap-3">
                <span className="text-sm capitalize text-neutral-700 dark:text-neutral-300 w-20">
                  {item.severity}
                </span>
                <div className="flex-1 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 dark:bg-neutral-200 rounded-full transition-all"
                    style={{
                      width: `${Math.max(8, (item.count / data.totalGroups) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 w-6 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            Top Categories
          </h2>
          <div className="space-y-2">
            {data.categoryBreakdown.slice(0, 8).map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {item.category}
                </span>
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top impacted areas */}
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4 md:col-span-2">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            Top Impacted Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {data.topImpactedAreas.map((area) => (
              <div
                key={area.area}
                className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-3 text-center"
              >
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {area.groupCount}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {area.area}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 px-4 py-3">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
        {value}
      </p>
    </div>
  );
}
