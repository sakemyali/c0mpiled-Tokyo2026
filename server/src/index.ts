import express from "express";
import cors from "cors";
import { router as groupsRouter } from "./routes/groups.js";
import { router as analyticsRouter } from "./routes/analytics.js";
import { router as entriesRouter } from "./routes/entries.js";
import { router as aiRouter } from "./routes/ai.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mount API routes
app.use("/api", groupsRouter);
app.use("/api", analyticsRouter);
app.use("/api", entriesRouter);
app.use("/api", aiRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Startup warnings
if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY not set -- AI endpoints will fail");
}

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
