import { NextResponse } from "next/server";
import { entries, groups } from "@/data/store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const group = groups.find((g) => g.id === id);
  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }
  const groupEntries = entries.filter((e) => e.groupId === group.id);
  return NextResponse.json({
    ...group,
    entryCount: groupEntries.length,
    entries: groupEntries,
  });
}
