import { useState, useEffect } from "react";

type PageKey =
  | "landing"
  | "login"
  | "register"
  | "eligibility"
  | "documents"
  | "application"
  | "tracker"
  | "sites"
  | "notifications"
  | "help"
  | "staff"
  | "admin";

type TrackerPageProps = {
  setActivePage: (page: PageKey) => void;
  currentUser?: any;
};

const STATE_LABELS: Record<string, string> = {
  "1": "Open",
  "2": "In Progress",
  "3": "On Hold",
  "4": "Awaiting Info",
  "6": "Resolved",
  "7": "Closed",
};

function getStateBadge(state: string) {
  const label = STATE_LABELS[state] || state || "Pending";
  if (label === "Resolved" || label === "Closed") return { label, cls: "bg-emerald-100 text-emerald-700" };
  if (label === "In Progress") return { label, cls: "bg-sky-100 text-sky-700" };
  if (label === "On Hold" || label === "Awaiting Info") return { label, cls: "bg-amber-100 text-amber-700" };
  return { label, cls: "bg-slate-100 text-slate-700" };
}

function TrackerPage({ setActivePage, currentUser }: TrackerPageProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSmsTab, setActiveSmsTab] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    fetch(`/api/x_1985733_cafsys/caf/applications?email=${encodeURIComponent(currentUser.email)}`, {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then((r) => r.json())
      .then((data) => {
        const payload = data.result || data;
        setApplications(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Application Tracker / Case Status</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              View all submitted CAF applications and their current status.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              New Application
            </button>
            <button
              onClick={() => setActivePage("documents")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              View Documents
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-600" />
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 px-6 py-4 text-red-700 ring-1 ring-red-200">
            Error loading applications: {error}
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-800">No applications yet</h2>
            <p className="mt-3 text-slate-500">Submit your first application to start tracking your case status here.</p>
            <button
              onClick={() => setActivePage("application")}
              className="mt-8 cursor-pointer rounded-2xl bg-sky-600 px-8 py-3 font-semibold text-white hover:bg-sky-700"
            >
              Start Application
            </button>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="space-y-5">
            {applications.map((app) => {
              const badge = getStateBadge(app.state);
              return (
                <div key={app.sys_id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                          {app.number || "Pending #"}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </div>
                      <h2 className="mt-3 text-xl font-bold text-slate-800">{app.patient_name}</h2>
                      {app.medical_condition && (
                        <p className="mt-1 text-sm text-slate-600">Condition: {app.medical_condition}</p>
                      )}
                      {app.selected_site && (
                        <p className="mt-1 text-sm text-slate-500">Site: {app.selected_site}</p>
                      )}
                      <p className="mt-2 text-xs text-slate-400">
                        Submitted: {new Date(app.sys_created_on).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setActivePage("documents")}
                        className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                      >
                        Upload Documents
                      </button>
                      <button
                        onClick={() => setActivePage("notifications")}
                        className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                      >
                        View Updates
                      </button>
                      <button
                        onClick={() => setActiveSmsTab(activeSmsTab === app.sys_id ? null : app.sys_id)}
                        className="cursor-pointer rounded-2xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                      >
                        📱 SMS Updates
                      </button>
                    </div>
                  </div>

                  {/* EXPANDABLE SMS PANEL */}
                  {activeSmsTab === app.sys_id && (
                    <div className="mt-6 border-t border-slate-100 pt-6 animate-fade-in" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                      <div className="mx-auto max-w-[320px] rounded-[3rem] border-[8px] border-slate-800 bg-slate-50 overflow-hidden shadow-xl" style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
                        
                        {/* Screen Header */}
                        <div className="bg-slate-100/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm ring-2 ring-white">CAF</div>
                          <div className="flex-1">
                            <h3 className="text-[13px] font-semibold text-slate-800 leading-tight">Automated SMS</h3>
                            <p className="text-[10px] text-slate-500 font-medium">Tracking System</p>
                          </div>
                        </div>

                        {/* Chat Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                          <p className="text-[10px] text-center text-slate-400 font-semibold mb-2 tracking-wider">TODAY {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          
                          <div className="self-start w-[85%]">
                            <div className="bg-slate-200 text-slate-800 text-[13px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm">
                              Hi {app.patient_name.split(' ')[0]}, your application <b>{app.number || "Pending #"}</b> has been successfully registered. 
                            </div>
                          </div>

                          <div className="self-start w-[85%]">
                            <div className="bg-slate-200 text-slate-800 text-[13px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm mt-1">
                              Status Update: Your case is currently marked as <b>{badge.label}</b>.
                            </div>
                          </div>

                          {badge.label === 'Open' && (
                            <div className="self-start w-[85%]">
                              <div className="bg-slate-200 text-sky-800 text-[13px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm mt-1 font-medium ring-1 ring-sky-200">
                                Action Required: Log into the portal to securely upload any missing documentary requirements.
                              </div>
                            </div>
                          )}

                           {badge.label === 'Resolved' && (
                            <div className="self-start w-[85%]">
                              <div className="bg-emerald-100 text-emerald-800 text-[13px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm mt-1 font-semibold ring-1 ring-emerald-300">
                                Great news! Funding has been approved for `{app.number || "Pending #"}` at {app.selected_site || "your center"}. A coordinator will contact you shortly.
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Fake Input Keyboard Area */}
                        <div className="bg-white border-t border-slate-200 p-3 pb-8">
                           <div className="w-full flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                             <span className="text-[12px] text-slate-400 font-medium">SMS replies disabled</span>
                             <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                             </div>
                           </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackerPage;
