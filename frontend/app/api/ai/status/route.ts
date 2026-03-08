import { NextResponse } from "next/server";
import { isProcessing } from "@/data/store";

export async function GET() {
  return NextResponse.json({ isProcessing });
}
