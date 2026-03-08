import { Router, Request, Response } from "express";
import { entries, groups } from "../data/store.js";

const router = Router();

// GET /groups - Returns all groups with computed entryCount
router.get("/groups", (_req: Request, res: Response) => {
  const result = groups.map((group) => ({
    ...group,
    entryCount: entries.filter((e) => e.groupId === group.id).length,
  }));
  res.json(result);
});

// GET /groups/:id - Returns a single group with its entries array
router.get("/groups/:id", (req: Request, res: Response) => {
  const group = groups.find((g) => g.id === req.params.id);
  if (!group) {
    res.status(404).json({ error: "Group not found" });
    return;
  }
  const groupEntries = entries.filter((e) => e.groupId === group.id);
  res.json({
    ...group,
    entryCount: groupEntries.length,
    entries: groupEntries,
  });
});

export { router };
