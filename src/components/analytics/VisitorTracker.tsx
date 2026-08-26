"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function VisitorTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [stats, setStats] = useState<{ totalVisits: number; todayVisits: number; uniqueVisitors: number } | null>(null);
  const [reportStatus, setReportStatus] = useState<string | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const refTag = searchParams ? (searchParams.get("ref") || searchParams.get("utm_source") || undefined) : undefined;
        const referrer = typeof document !== "undefined" ? document.referrer : "";

        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname || "/",
            referrer,
            refTag,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
            deviceType: typeof window !== "undefined" && window.innerWidth < 768 ? "Mobile" : "Desktop"
          })
        });
      } catch (err) {
        // Silently handle analytics track errors to never disrupt user experience
      }
    };

    trackVisitor();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setShowAdminPanel((prev) => !prev);
        fetchStats();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/analytics/report");
      const data = await res.json();
      if (data.success && data.summary) {
        setStats({
          totalVisits: data.summary.totalVisits,
          todayVisits: data.summary.todayVisits,
          uniqueVisitors: data.summary.uniqueVisitors
        });
      }
    } catch (e) {
      console.error("Failed to load visitor stats", e);
    }
  };

  const handleSendEmailReportNow = async () => {
    setLoadingReport(true);
    setReportStatus(null);
    try {
      const res = await fetch("/api/analytics/report", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setReportStatus("✅ Report sent to gsampathchary454@gmail.com!");
      } else {
        setReportStatus(`⚠️ ${data.message || "Failed to send report"}`);
      }
    } catch (err) {
      setReportStatus("❌ Error sending email report");
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-3 left-3 z-[60]">
        <button
          type="button"
          onClick={() => {
            setShowAdminPanel(!showAdminPanel);
            if (!showAdminPanel) fetchStats();
          }}
          title="Portfolio Visitor Analytics (Alt + A)"
          className="flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur-md transition hover:border-cyan-500/50 hover:bg-slate-900 hover:text-cyan-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Analytics</span>
        </button>
      </div>

      {showAdminPanel ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-950 p-5 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Website Traffic Manager</div>
                <h3 className="text-lg font-bold text-white">Visitor Analytics & Email Dispatch</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminPanel(false)}
                className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Total Visits</div>
                <div className="mt-1 text-xl font-extrabold text-cyan-400">{stats ? stats.totalVisits : "--"}</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Today</div>
                <div className="mt-1 text-xl font-extrabold text-emerald-400">{stats ? stats.todayVisits : "--"}</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Unique</div>
                <div className="mt-1 text-xl font-extrabold text-purple-400">{stats ? stats.uniqueVisitors : "--"}</div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-slate-300">
              Visitor stats & redirect source breakdown are automatically logged and formatted to be sent time-to-time directly to <span className="font-semibold text-cyan-300">gsampathchary454@gmail.com</span>.
            </div>

            {reportStatus ? (
              <div className="mt-3 rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-center text-xs font-semibold text-slate-200">
                {reportStatus}
              </div>
            ) : null}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={handleSendEmailReportNow}
                disabled={loadingReport}
                className="flex-1 rounded-full bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
              >
                {loadingReport ? "Sending..." : "📧 Send Report to My Email Now"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function VisitorTracker() {
  return (
    <Suspense fallback={null}>
      <VisitorTrackerInner />
    </Suspense>
  );
}
