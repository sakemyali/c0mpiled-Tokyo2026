import { Router, Request, Response } from "express";
import { entries, groups, isProcessing, setProcessing } from "../data/store.js";
import { runPipeline } from "../services/ai-pipeline.js";

const router = Router();

// POST /ai/process - Trigger AI clustering and summarization pipeline
router.post("/ai/process", async (_req: Request, res: Response) => {
  if (isProcessing) {
    res.status(409).json({ error: "AI pipeline is already processing" });
    return;
  }

  setProcessing(true);

  try {
    const result = await runPipeline(entries);

    // Replace groups with AI-generated ones
    groups.length = 0;
    groups.push(...result.newGroups);

    // Update entry groupId assignments
    for (const entry of entries) {
      if (result.assignments[entry.id]) {
        entry.groupId = result.assignments[entry.id];
      }
    }

    setProcessing(false);
    res.json({ success: true, groupCount: result.newGroups.length });
  } catch (err) {
    setProcessing(false);
    console.error("AI pipeline failed:", err);
    res.status(500).json({
      error: "AI pipeline failed",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

// GET /ai/status - Check if AI pipeline is currently running
router.get("/ai/status", (_req: Request, res: Response) => {
  res.json({ isProcessing });
});

export { router };
