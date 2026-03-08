import { NextResponse } from "next/server";
import { entries } from "@/data/store";
import type { FeedbackEntry } from "@/lib/types";

export async function POST(req: Request) {
  const { text, source, userName } = await req.json();

  if (!text || !source || !userName) {
    return NextResponse.json(
      { error: "Missing required fields: text, source, userName" },
      { status: 400 }
    );
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
  return NextResponse.json(entry, { status: 201 });
}

export async function GET() {
  const ungrouped = entries.filter((e) => e.groupId === "ungrouped");
  return NextResponse.json(ungrouped);
}
