import { NextResponse } from "next/server";
import { entries, groups } from "@/data/store";

export async function GET() {
  const result = groups.map((group) => ({
    ...group,
    entryCount: entries.filter((e) => e.groupId === group.id).length,
  }));
  return NextResponse.json(result);
}
