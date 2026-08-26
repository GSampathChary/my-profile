import { NextResponse } from "next/server";
import { sendAnalyticsEmailReport } from "@/lib/analyticsStore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const expectedSecret = process.env.CRON_SECRET;

  if (expectedSecret && key !== expectedSecret) {
    return NextResponse.json({ success: false, error: "Unauthorized cron trigger" }, { status: 401 });
  }

  try {
    const result = await sendAnalyticsEmailReport();
    return NextResponse.json({ success: result.success, message: result.message, timestamp: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
