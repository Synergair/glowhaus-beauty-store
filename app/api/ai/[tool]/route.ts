import { NextResponse } from "next/server";
import { runMockAI } from "@/lib/ai-mocks";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tool: string }> }
) {
  const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const { tool } = await params;
  const response = runMockAI(tool, payload);
  return NextResponse.json(response);
}
