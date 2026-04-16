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

const STEPS = [
  { label: "Submitted", sub: "Apr 10, 2026" },
  { label: "Under Review", sub: "Apr 11, 2026" },
  { label: "Pending Documents", sub: "Apr 12, 2026" },
  { label: "Verified", sub: "Waiting" },
  { label: "Approved", sub: "Waiting" },
  { label: "Released / Completed", sub: "Waiting" },
];

function TrackerPage({ setActivePage, currentUser }: TrackerPageProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    fetch(`/api/x_1985733_cafsys/caf/applications?email=${encodeURIComponent(currentUser.email)}`, {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then(res => res.json())
      .then(data => {
        const apps = data.result || data;
        const appsArr = Array.isArray(apps) ? apps : [];
        setApplications(appsArr);
        if (appsArr.length > 0) {
          setSelectedApp(appsArr[0]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  useEffect(() => {
    if (selectedApp?.sys_id) {
      setLogsLoading(true);
      fetch(`/api/x_1985733_cafsys/caf/applications/${selectedApp.sys_id}/logs`, {
        headers: { "X-UserToken": (window as any).g_ck || "" }
      })
        .then(res => res.json())
        .then(data => {
          setLogs(data.result || data);
        })
        .finally(() => setLogsLoading(false));
    }
  }, [selectedApp]);

  const getActiveStep = (state: string) => {
    if (state === "7") return 6;
    if (state === "6") return 5;
    if (state === "4") return 4;
    if (state === "3") return 3;
    if (state === "2") return 2;
    return 1;
  };

  const currentStep = selectedApp ? getActiveStep(selectedApp.state) : 0;

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
    </div>
  );

  if (applications.length === 0) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800">No Applications Found</h2>
      <p className="mt-2 text-slate-500 max-w-sm">You haven't submitted any applications yet. Start a new intake process to track your status.</p>
      <button onClick={() => setActivePage("application")} className="mt-8 rounded-2xl bg-sky-600 px-8 py-3 font-bold text-white shadow-lg hover:bg-sky-700 transition">
        Start New Application
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Application Tracker / Case Status</h1>
            <p className="mt-2 text-slate-600 max-w-2xl">
              Follow the current status of the patient request, review recent updates, and monitor SMS notifications related to the case.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setActivePage("documents")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-sky-400">
              View Documents
            </button>
            <button className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-sky-700">
              Contact Support
            </button>
          </div>
        </header>

        {applications.length > 1 && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Your Applications:</p>
            {applications.map(app => (
              <button 
                key={app.sys_id} 
                onClick={() => setSelectedApp(app)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${selectedApp?.sys_id === app.sys_id ? "bg-sky-600 text-white shadow-md" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}
              >
                {app.number} - {app.patient_name}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Case Overview</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">CAF Case Status Timeline</h2>
                  <p className="mt-1 text-sm text-slate-500">Current application status: <span className="font-bold text-sky-600">{STEPS[currentStep-1]?.label || "Processing"}</span></p>
                </div>
                {selectedApp.state === "3" && (
                   <div className="rounded-2xl bg-amber-50 px-5 py-3 text-sm font-bold text-amber-700 ring-1 ring-amber-200 animate-pulse">
                     Action needed: Upload corrected prescription
                   </div>
                )}
              </div>

              <div className="mt-12 overflow-x-auto pb-4">
                <div className="flex min-w-[700px] items-start justify-between">
                   {STEPS.map((step, index) => {
                     const stepNum = index + 1;
                     const isCompleted = currentStep > stepNum;
                     const isActive = currentStep === stepNum;
                     return (
                       <div key={index} className="flex flex-1 flex-col items-center px-2 text-center relative">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md transition-all duration-500 ${isCompleted ? "bg-emerald-600 text-white" : isActive ? "bg-sky-600 text-white scale-110 ring-4 ring-sky-100" : "bg-white text-slate-400 ring-1 ring-slate-200"}`}>
                            {isCompleted ? "✓" : stepNum}
                          </div>
                          <p className={`mt-4 text-xs font-bold leading-tight ${isActive ? "text-slate-800" : "text-slate-500"}`}>{step.label}</p>
                          <p className="mt-1 text-[10px] uppercase font-bold text-slate-400 tracking-tighter">{step.sub}</p>
                          
                          {index < STEPS.length - 1 && (
                            <div className="absolute left-[calc(50%+25px)] top-5 h-0.5 w-[calc(100%-50px)] bg-slate-100">
                               <div className={`h-full bg-emerald-500 transition-all duration-700 ${isCompleted ? "w-full" : "w-0"}`} />
                            </div>
                          )}
                       </div>
                     );
                   })}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-sky-700 uppercase tracking-widest">Recent Updates Log</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-800">Latest case activity</h3>

              <div className="mt-8 space-y-6">
                {logsLoading ? (
                  <p className="text-center py-10 text-slate-400 italic">Updating log entries...</p>
                ) : logs.length === 0 ? (
                  <p className="text-center py-10 text-slate-400 italic">No recent activity detected.</p>
                ) : logs.map((log, idx) => (
                  <div key={log.sys_id || idx} className="group relative rounded-2xl border border-slate-100 bg-slate-50/50 p-6 hover:bg-white hover:shadow-md transition">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="text-lg font-bold text-slate-800">{log.title}</h4>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{log.timestamp}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{log.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
               <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Assigned Site</p>
                  <h4 className="mt-3 text-xl font-bold text-slate-800 leading-tight">{selectedApp.selected_site || "Jose R. Reyes Memorial Medical Center"}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    The selected access site is currently reviewing the submitted patient information and waiting for corrected supporting documents.
                  </p>
               </div>
               <div className="rounded-3xl bg-amber-50 p-8 ring-1 ring-amber-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Pending Requirement</p>
                  <h4 className="mt-3 text-xl font-bold text-slate-800 leading-tight">Doctor's Prescription</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    The uploaded prescription needs correction because the signature or date is not clear enough for verification.
                  </p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 tracking-widest">SMS Notification Status</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-800 leading-snug">Message delivery panel</h3>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                   <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Latest SMS Sent</p>
                   <p className="mt-2 text-sm font-semibold text-slate-700 leading-relaxed">Reminder: Please upload corrected prescription</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                   <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Delivery Status</p>
                   <p className="mt-2 text-sm font-bold text-emerald-600">Delivered successfully</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                   <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Preferred Contact</p>
                   <p className="mt-2 text-sm font-bold text-slate-700">SMS updates enabled</p>
                </div>
              </div>

              <button onClick={() => setActivePage("notifications")} className="mt-8 w-full cursor-pointer rounded-2xl bg-sky-600 py-4 font-bold text-white shadow-lg hover:bg-sky-700 transition">
                Open Notifications Center
              </button>
            </div>

            <div className="rounded-3xl bg-emerald-50 p-8 ring-1 ring-emerald-100 border-l-8 border-emerald-400">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Need follow-up?</p>
              <h3 className="mt-3 text-xl font-bold text-slate-800 leading-tight">Support is available</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Patients and guardians may contact the support desk for questions about missing documents, access site assignment, or case movement.
              </p>
              <button onClick={() => setActivePage("help")} className="mt-6 w-full cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm hover:shadow-md transition">
                Go to Help & Support
              </button>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-700 tracking-widest text-sky-600 uppercase font-bold tracking-widest">Quick Links</p>
              <div className="mt-6 space-y-3">
                <button onClick={() => setActivePage("application")} className="w-full cursor-pointer rounded-2xl border border-slate-200 px-5 py-3.5 text-left text-sm font-bold text-slate-700 hover:border-sky-400 hover:bg-sky-50">
                  Patient Application Form
                </button>
                <button onClick={() => setActivePage("sites")} className="w-full cursor-pointer rounded-2xl border border-slate-200 px-5 py-3.5 text-left text-sm font-bold text-slate-700 hover:border-sky-400 hover:bg-sky-50">
                  Access Sites Directory
                </button>
                <button onClick={() => setActivePage("login")} className="w-full cursor-pointer rounded-2xl border border-slate-200 px-5 py-3.5 text-left text-sm font-bold text-slate-700 hover:border-sky-400 hover:bg-sky-50">
                  Patient Portal Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackerPage;
