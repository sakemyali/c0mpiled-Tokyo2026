import { Router, Request, Response } from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const groups = require("../data/groups.json") as Array<Record<string, unknown>>;
const entries = require("../data/entries.json") as Array<Record<string, unknown>>;

const router = Router();

// GET /analytics - Returns aggregate analytics derived from seed data
router.get("/analytics", (_req: Request, res: Response) => {
  // Severity distribution
  const severityCounts: Record<string, number> = {};
  for (const group of groups) {
    const sev = group.severity as string;
    severityCounts[sev] = (severityCounts[sev] || 0) + 1;
  }
  const severityDistribution = Object.entries(severityCounts).map(
    ([severity, count]) => ({ severity, count })
  );

  // Category breakdown
  const categoryCounts: Record<string, number> = {};
  for (const group of groups) {
    const cats = group.categories as string[];
    for (const cat of cats) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  }
  const categoryBreakdown = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // Volume by date (past 30 days)
  const volumeMap: Record<string, number> = {};
  const now = new Date("2026-03-08T00:00:00Z");
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    volumeMap[key] = 0;
  }
  for (const entry of entries) {
    const dateKey = (entry.submittedAt as string).split("T")[0];
    if (dateKey in volumeMap) {
      volumeMap[dateKey]++;
    }
  }
  const volumeByDate = Object.entries(volumeMap).map(([date, count]) => ({
    date,
    count,
  }));

  // Top impacted areas: categories ranked by how many groups reference them
  const areaCounts: Record<string, number> = {};
  for (const group of groups) {
    const cats = group.categories as string[];
    for (const cat of cats) {
      areaCounts[cat] = (areaCounts[cat] || 0) + 1;
    }
  }
  const topImpactedAreas = Object.entries(areaCounts)
    .map(([area, groupCount]) => ({ area, groupCount }))
    .sort((a, b) => b.groupCount - a.groupCount)
    .slice(0, 5);

  res.json({
    totalEntries: entries.length,
    totalGroups: groups.length,
    severityDistribution,
    categoryBreakdown,
    volumeByDate,
    topImpactedAreas,
  });
});

export { router };
