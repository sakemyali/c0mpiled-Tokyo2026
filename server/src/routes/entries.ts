import { Router, Request, Response } from "express";
import crypto from "crypto";
import { entries } from "../data/store.js";
import type { FeedbackEntry } from "../types.js";

const router = Router();

// POST /entries - Submit new feedback entry
router.post("/entries", (req: Request, res: Response) => {
  const { text, source, userName } = req.body;

  if (!text || !source || !userName) {
    res.status(400).json({ error: "Missing required fields: text, source, userName" });
    return;
  }

  const entry: FeedbackEntry = {
    id: `entry-${crypto.randomUUID().slice(0, 8)}`,
    text,
    source,
    userName,
    submittedAt: new Date().toISOString(),
    groupId: "ungrouped",
  };

  entries.push(entry);
  res.status(201).json(entry);
});

// GET /entries/ungrouped - Returns entries not yet assigned to a group
router.get("/entries/ungrouped", (_req: Request, res: Response) => {
  const ungrouped = entries.filter((e) => e.groupId === "ungrouped");
  res.json(ungrouped);
});

export { router };
