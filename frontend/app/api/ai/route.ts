import { NextResponse } from "next/server";
import { entries, groups, isProcessing, setProcessing } from "@/data/store";
import { runPipeline } from "@/services/ai-pipeline";

export async function POST() {
  if (isProcessing) {
    return NextResponse.json(
      { error: "AI pipeline is already processing" },
      { status: 409 }
    );
  }

  setProcessing(true);

  try {
    const result = await runPipeline(entries);

    groups.length = 0;
    groups.push(...result.newGroups);

    for (const entry of entries) {
      if (result.assignments[entry.id]) {
        entry.groupId = result.assignments[entry.id];
      }
    }

    setProcessing(false);
    return NextResponse.json({ success: true, groupCount: result.newGroups.length });
  } catch (err) {
    setProcessing(false);
    return NextResponse.json(
      {
        error: "AI pipeline failed",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
