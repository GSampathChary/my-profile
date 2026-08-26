import { NextResponse } from "next/server";
import { getAnalyticsSummary, sendAnalyticsEmailReport } from "@/lib/analyticsStore";

export async function GET() {
  try {
    const summary = getAnalyticsSummary();
    return NextResponse.json({ success: true, summary });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await sendAnalyticsEmailReport();
    const summary = getAnalyticsSummary();
    return NextResponse.json({ success: result.success, message: result.message, summary });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
