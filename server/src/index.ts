import express from "express";
import cors from "cors";
import { router as groupsRouter } from "./routes/groups.js";
import { router as analyticsRouter } from "./routes/analytics.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mount API routes
app.use("/api", groupsRouter);
app.use("/api", analyticsRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
