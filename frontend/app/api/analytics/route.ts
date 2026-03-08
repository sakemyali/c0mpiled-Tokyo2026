import { NextResponse } from "next/server";
import { entries, groups } from "@/data/store";

export async function GET() {
  const severityCounts: Record<string, number> = {};
  for (const group of groups) {
    severityCounts[group.severity] = (severityCounts[group.severity] || 0) + 1;
  }
  const severityDistribution = Object.entries(severityCounts).map(
    ([severity, count]) => ({ severity, count })
  );

  const categoryCounts: Record<string, number> = {};
  for (const group of groups) {
    for (const cat of group.categories) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  }
  const categoryBreakdown = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const volumeMap: Record<string, number> = {};
  const now = new Date("2026-03-08T00:00:00Z");
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    volumeMap[d.toISOString().split("T")[0]] = 0;
  }
  for (const entry of entries) {
    const dateKey = entry.submittedAt.split("T")[0];
    if (dateKey in volumeMap) {
      volumeMap[dateKey]++;
    }
  }
  const volumeByDate = Object.entries(volumeMap).map(([date, count]) => ({
    date,
    count,
  }));

  const areaCounts: Record<string, number> = {};
  for (const group of groups) {
    for (const cat of group.categories) {
      areaCounts[cat] = (areaCounts[cat] || 0) + 1;
    }
  }
  const topImpactedAreas = Object.entries(areaCounts)
    .map(([area, groupCount]) => ({ area, groupCount }))
    .sort((a, b) => b.groupCount - a.groupCount)
    .slice(0, 5);

  return NextResponse.json({
    totalEntries: entries.length,
    totalGroups: groups.length,
    severityDistribution,
    categoryBreakdown,
    volumeByDate,
    topImpactedAreas,
  });
}
