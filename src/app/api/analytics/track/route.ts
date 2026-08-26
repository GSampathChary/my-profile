import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/analyticsStore";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const headers = request.headers;

    const userAgent = headers.get("user-agent") || body.userAgent || "";
    const headerReferrer = headers.get("referer") || "";
    const referrer = body.referrer || headerReferrer || "direct";
    const path = body.path || "/";
    const refTag = body.refTag || undefined;
    const deviceType = body.deviceType || (userAgent.toLowerCase().includes("mobile") ? "Mobile" : "Desktop");

    const visit = recordVisit({
      path,
      referrer,
      refTag,
      userAgent,
      deviceType,
      ipHash: headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"
    });

    return NextResponse.json({ success: true, visitId: visit.id });
  } catch (error: any) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Analytics tracking endpoint active" });
}
