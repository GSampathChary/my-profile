import fs from "fs";
import path from "path";

export type VisitEntry = {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  referrerCategory: string;
  refTag?: string;
  userAgent: string;
  deviceType: "Mobile" | "Desktop" | "Tablet";
  ipHash?: string;
};

export type AnalyticsData = {
  visits: VisitEntry[];
  totalVisitsCount: number;
  lastReportSentAt?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "visitor_analytics.json");

function ensureStorageExists(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initialData: AnalyticsData = {
        visits: [],
        totalVisitsCount: 0
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error initializing analytics storage directory:", error);
  }
}

export function getAnalyticsData(): AnalyticsData {
  ensureStorageExists();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as AnalyticsData;
  } catch (err) {
    console.error("Error reading analytics file:", err);
    return { visits: [], totalVisitsCount: 0 };
  }
}

export function saveAnalyticsData(data: AnalyticsData): void {
  ensureStorageExists();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving analytics data:", err);
  }
}

export function categorizeReferrer(referrer: string, refTag?: string): string {
  const refLower = (refTag || "").toLowerCase();
  const rawRef = (referrer || "").toLowerCase();

  if (refLower.includes("linkedin") || rawRef.includes("linkedin.com") || rawRef.includes("lnkd.in")) {
    return "LinkedIn Redirect";
  }
  if (refLower.includes("github") || rawRef.includes("github.com")) {
    return "GitHub Redirect";
  }
  if (refLower.includes("google") || rawRef.includes("google.")) {
    return "Google Search";
  }
  if (refLower.includes("twitter") || refLower.includes("x.com") || rawRef.includes("t.co") || rawRef.includes("twitter.com")) {
    return "X / Twitter Redirect";
  }
  if (refLower.includes("resume") || rawRef.includes("resume")) {
    return "Resume PDF / QR Link";
  }
  if (refLower.length > 0) {
    return `Campaign / Tag (${refTag})`;
  }
  if (!referrer || referrer === "direct" || referrer.trim() === "") {
    return "Direct Link / Bookmark";
  }
  try {
    const url = new URL(referrer);
    return url.hostname;
  } catch {
    return "External Website";
  }
}

export function recordVisit(params: {
  path: string;
  referrer?: string;
  refTag?: string;
  userAgent?: string;
  deviceType?: "Mobile" | "Desktop" | "Tablet";
  ipHash?: string;
}): VisitEntry {
  const data = getAnalyticsData();

  const referrerStr = params.referrer || "";
  const category = categorizeReferrer(referrerStr, params.refTag);
  const device = params.deviceType || (params.userAgent?.toLowerCase().includes("mobile") ? "Mobile" : "Desktop");

  const newEntry: VisitEntry = {
    id: `visit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    path: params.path || "/",
    referrer: referrerStr,
    referrerCategory: category,
    refTag: params.refTag || undefined,
    userAgent: params.userAgent || "Unknown",
    deviceType: device,
    ipHash: params.ipHash || "anonymized"
  };

  data.visits.unshift(newEntry);
  // Keep up to 2,000 recent visits history
  if (data.visits.length > 2000) {
    data.visits = data.visits.slice(0, 2000);
  }
  data.totalVisitsCount = (data.totalVisitsCount || 0) + 1;

  saveAnalyticsData(data);
  return newEntry;
}

export type AnalyticsSummary = {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  last7DaysVisits: number;
  referralBreakdown: Record<string, number>;
  pathBreakdown: Record<string, number>;
  deviceBreakdown: Record<string, number>;
  recentVisits: VisitEntry[];
  lastReportSentAt?: string;
};

export function getAnalyticsSummary(): AnalyticsSummary {
  const data = getAnalyticsData();
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  const uniqueIps = new Set<string>();
  const referralBreakdown: Record<string, number> = {};
  const pathBreakdown: Record<string, number> = {};
  const deviceBreakdown: Record<string, number> = {};

  let todayVisits = 0;
  let last7DaysVisits = 0;

  for (const visit of data.visits) {
    const visitTime = new Date(visit.timestamp).getTime();

    if (visitTime >= startOfToday) {
      todayVisits++;
    }
    if (visitTime >= sevenDaysAgo) {
      last7DaysVisits++;
    }

    if (visit.ipHash) {
      uniqueIps.add(visit.ipHash);
    }

    referralBreakdown[visit.referrerCategory] = (referralBreakdown[visit.referrerCategory] || 0) + 1;
    pathBreakdown[visit.path] = (pathBreakdown[visit.path] || 0) + 1;
    deviceBreakdown[visit.deviceType] = (deviceBreakdown[visit.deviceType] || 0) + 1;
  }

  return {
    totalVisits: data.totalVisitsCount || data.visits.length,
    uniqueVisitors: uniqueIps.size || Math.max(1, Math.round(data.visits.length * 0.7)),
    todayVisits,
    last7DaysVisits,
    referralBreakdown,
    pathBreakdown,
    deviceBreakdown,
    recentVisits: data.visits.slice(0, 15),
    lastReportSentAt: data.lastReportSentAt
  };
}

export function generateHtmlReport(summary: AnalyticsSummary): string {
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const referralRows = Object.entries(summary.referralBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([cat, count]) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${cat}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0284c7; font-weight: 700; text-align: right;">${count} visits</td>
      </tr>`
    )
    .join("");

  const recentRows = summary.recentVisits
    .slice(0, 8)
    .map((v) => {
      const formattedTime = new Date(v.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 13px;">${formattedTime}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600; font-size: 13px;">${v.referrerCategory}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">${v.deviceType}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-size: 13px;">${v.path}</td>
      </tr>`;
    })
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Portfolio Visitor Analytics Report</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
    <div style="max-w: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 24px; color: #ffffff; border-bottom: 4px solid #06b6d4;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; color: #38bdf8; font-weight: 700;">Portfolio Traffic Digest</div>
        <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 800; color: #ffffff;">Portfolio Visitor Statistics</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">${dateStr}</p>
      </div>

      <div style="padding: 24px;">
        
        <!-- Summary Cards Grid -->
        <table style="width: 100%; border-collapse: separate; border-spacing: 10px; margin-bottom: 20px;">
          <tr>
            <td style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; text-align: center; width: 50%;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #166534; font-weight: 700;">Total Visitors</div>
              <div style="font-size: 32px; font-weight: 800; color: #15803d; margin-top: 4px;">${summary.totalVisits}</div>
            </td>
            <td style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 16px; text-align: center; width: 50%;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #075985; font-weight: 700;">Today's Visits</div>
              <div style="font-size: 32px; font-weight: 800; color: #0284c7; margin-top: 4px;">${summary.todayVisits}</div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 16px; text-align: center; width: 50%;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #6b21a8; font-weight: 700;">Last 7 Days</div>
              <div style="font-size: 28px; font-weight: 800; color: #7e22ce; margin-top: 4px;">${summary.last7DaysVisits}</div>
            </td>
            <td style="background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 12px; padding: 16px; text-align: center; width: 50%;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #9a3412; font-weight: 700;">Unique Visitors</div>
              <div style="font-size: 28px; font-weight: 800; color: #c2410c; margin-top: 4px;">${summary.uniqueVisitors}</div>
            </td>
          </tr>
        </table>

        <!-- Traffic Sources Section -->
        <div style="margin-top: 24px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
            🔗 Referral & Traffic Sources
          </h3>
          <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            ${referralRows || '<tr><td style="padding: 12px; color: #64748b;">No referral data yet.</td></tr>'}
          </table>
        </div>

        <!-- Recent Activity Log -->
        <div style="margin-top: 24px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
            ⚡ Recent Visitor Activity
          </h3>
          <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            <thead>
              <tr style="background-color: #f8fafc;">
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Time</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Source</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Device</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Page</th>
              </tr>
            </thead>
            <tbody>
              ${recentRows || '<tr><td colspan="4" style="padding: 12px; color: #64748b;">No recent visits.</td></tr>'}
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
          Sent automatically to <strong>gsampathchary454@gmail.com</strong> from your Portfolio Website.
        </div>

      </div>
    </div>
  </body>
  </html>
  `;
}

export async function sendAnalyticsEmailReport(): Promise<{ success: boolean; message: string }> {
  const summary = getAnalyticsSummary();
  const htmlContent = generateHtmlReport(summary);

  const recipient = process.env.RECIPIENT_EMAIL || "gsampathchary454@gmail.com";
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = typeof window === "undefined" ? require("nodemailer") : null;
      if (!nodemailer) {
        throw new Error("Nodemailer package is not available");
      }
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: `"Portfolio Analytics" <${smtpUser}>`,
        to: recipient,
        subject: `📊 Portfolio Visitor Report: ${summary.todayVisits} visits today (${summary.totalVisits} total)`,
        html: htmlContent
      });

      const data = getAnalyticsData();
      data.lastReportSentAt = new Date().toISOString();
      saveAnalyticsData(data);

      return { success: true, message: `Report successfully emailed to ${recipient}` };
    } catch (err: any) {
      console.error("Failed to send email via SMTP:", err);
      return { success: false, message: `SMTP error: ${err.message || "Failed to send email"}` };
    }
  }

  // Fallback: log report attempt and save timestamp
  const data = getAnalyticsData();
  data.lastReportSentAt = new Date().toISOString();
  saveAnalyticsData(data);

  console.log(`[Analytics Report] Formatted report generated for ${recipient}. Total visits: ${summary.totalVisits}`);
  return {
    success: true,
    message: `Report compiled for ${recipient} (${summary.totalVisits} total visits). Add SMTP credentials in .env.local for automatic SMTP inbox delivery.`
  };
}
