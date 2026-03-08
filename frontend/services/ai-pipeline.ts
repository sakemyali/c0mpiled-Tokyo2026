import OpenAI from "openai";
import type { FeedbackEntry, FeedbackGroup } from "@/lib/types";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) _openai = new OpenAI();
  return _openai;
}

interface ClusterResult {
  groups: Array<{
    title: string;
    entryIndices: number[];
    categories: string[];
  }>;
}

interface SummaryResult {
  summary: string;
  severity: "critical" | "high" | "medium" | "low";
  problem: string;
  impact: string;
  reproductionSteps: string[];
  suggestion: string;
}

async function clusterEntries(
  entries: FeedbackEntry[]
): Promise<ClusterResult> {
  const numberedList = entries
    .map((e, i) => `${i}. ${e.text}`)
    .join("\n");

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a feedback analysis expert. Group these user feedback entries by their underlying problem similarity. Create 5-15 groups. Return JSON with this exact shape: { "groups": [{ "title": "Group Title", "entryIndices": [0, 3, 7], "categories": ["UI", "Performance"] }] }. Each entry index must appear in exactly one group. Categories should be short labels like: UI, Performance, Billing, Auth, Mobile, API, Data, Search, Notifications, Onboarding.`,
      },
      {
        role: "user",
        content: `Group these ${entries.length} feedback entries:\n\n${numberedList}`,
      },
    ],
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("Empty response from clustering");
  return JSON.parse(content) as ClusterResult;
}

async function summarizeGroup(
  title: string,
  entryTexts: string[]
): Promise<SummaryResult> {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a feedback analysis expert. Summarize this group of user feedback entries. Return JSON: { "summary": "...", "severity": "critical|high|medium|low", "problem": "...", "impact": "...", "reproductionSteps": ["step1", "step2"], "suggestion": "..." }. Be concise and actionable.`,
      },
      {
        role: "user",
        content: `Group title: "${title}"\n\nFeedback entries:\n${entryTexts.map((t, i) => `${i + 1}. ${t}`).join("\n")}`,
      },
    ],
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("Empty response from summarization");
  return JSON.parse(content) as SummaryResult;
}

export async function runPipeline(allEntries: FeedbackEntry[]): Promise<{
  newGroups: FeedbackGroup[];
  assignments: Record<string, string>;
}> {
  const clusterResult = await clusterEntries(allEntries);

  const summaryPromises = clusterResult.groups.map(async (cluster, index) => {
    const entryTexts = cluster.entryIndices.map((i) => allEntries[i]?.text ?? "");
    try {
      const summary = await summarizeGroup(cluster.title, entryTexts);
      return { cluster, index, summary };
    } catch {
      return {
        cluster,
        index,
        summary: {
          summary: `Feedback about: ${cluster.title}`,
          severity: "medium" as const,
          problem: cluster.title,
          impact: "Affects user experience",
          reproductionSteps: ["See related entries"],
          suggestion: "Investigate and address reported issues",
        },
      };
    }
  });

  const results = await Promise.all(summaryPromises);

  const newGroups: FeedbackGroup[] = [];
  const assignments: Record<string, string> = {};

  for (const { cluster, index, summary } of results) {
    const groupId = `group-ai-${index}`;

    const entryDates = cluster.entryIndices
      .map((i) => allEntries[i]?.submittedAt)
      .filter(Boolean)
      .sort();

    const group: FeedbackGroup = {
      id: groupId,
      title: cluster.title,
      summary: summary.summary,
      severity: summary.severity,
      entryCount: cluster.entryIndices.length,
      categories: cluster.categories,
      aiSummary: {
        problem: summary.problem,
        impact: summary.impact,
        reproductionSteps: summary.reproductionSteps,
        suggestion: summary.suggestion,
      },
      duplicateCount: Math.max(0, cluster.entryIndices.length - 1),
      trendDirection: "stable",
      firstReported: entryDates[0] ?? new Date().toISOString(),
      lastReported: entryDates[entryDates.length - 1] ?? new Date().toISOString(),
    };

    newGroups.push(group);

    for (const entryIndex of cluster.entryIndices) {
      const entry = allEntries[entryIndex];
      if (entry) {
        assignments[entry.id] = groupId;
      }
    }
  }

  return { newGroups, assignments };
}
