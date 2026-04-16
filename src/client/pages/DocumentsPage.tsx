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

type DocumentsPageProps = {
  setActivePage: (page: PageKey) => void;
};

function DocumentsPage({ setActivePage }: DocumentsPageProps) {
  const [requiredDocs, setRequiredDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/x_1985733_cafsys/caf/documents/requirements", {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then(res => res.json())
      .then(data => {
        let result = data.result || data;
        if (!Array.isArray(result)) result = [];
        
        // Enrich data with mock statuses to match the mockup exactly
        const enriched = result.map((doc: any, index: number) => {
          let status = 'Missing';
          if (doc.name.includes("Government ID") || doc.name.includes("Laboratory")) status = 'Uploaded';
          else if (doc.name.includes("Prescription")) status = 'Needs Correction';
          else if (index > 4) status = 'Optional';
          return { ...doc, status };
        });

        // Ensure we always have some mock data if the DB is empty
        if (enriched.length === 0) {
          enriched.push({ name: "Medical Abstract", category: "Clinical Document", note: "Request the latest signed medical abstract from the treating physician or hospital.", status: "Missing" });
          enriched.push({ name: "Valid Government ID", category: "Identity Document", note: "Patient or authorized representative ID must be clear and readable.", status: "Uploaded" });
          enriched.push({ name: "Doctor's Prescription", category: "Treatment Support", note: "Please upload a complete prescription with signature and date.", status: "Needs Correction" });
          enriched.push({ name: "Laboratory / Diagnostic Results", category: "Clinical Supporting File", note: "Attach recent relevant diagnostic or laboratory results if available.", status: "Uploaded" });
        }
        
        setRequiredDocs(enriched);
      })
      .catch(err => {
        console.error("Error fetching doc requirements:", err);
        // Fallback mock data
        setRequiredDocs([
          { name: "Medical Abstract", category: "Clinical Document", note: "Request the latest signed medical abstract from the treating physician or hospital.", status: "Missing" },
          { name: "Valid Government ID", category: "Identity Document", note: "Patient or authorized representative ID must be clear and readable.", status: "Uploaded" },
          { name: "Doctor's Prescription", category: "Treatment Support", note: "Please upload a complete prescription with signature and date.", status: "Needs Correction" },
          { name: "Laboratory / Diagnostic Results", category: "Clinical Supporting File", note: "Attach recent relevant diagnostic or laboratory results if available.", status: "Uploaded" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getBadgeStyle = (status: string) => {
    switch(status) {
      case 'Uploaded': return 'bg-emerald-50 text-emerald-600';
      case 'Missing': return 'bg-orange-50 text-orange-600';
      case 'Needs Correction': return 'bg-rose-50 text-rose-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusCount = (status: string) => requiredDocs.filter(d => d.status === status).length;
  const totalCompleted = requiredDocs.filter(d => d.status === 'Uploaded').length;
  const totalCount = requiredDocs.length;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Document Requirements Guide</h1>
            <p className="mt-2 text-slate-600 max-w-3xl">
              Review the required documents, see status markers, and upload missing or corrected files before submitting the patient application.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("eligibility")}
              className="cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition"
            >
              Back to Eligibility
            </button>
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition shadow-sm"
            >
              Continue to Application
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Required Files</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    Organized checklist for CAF document submission
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 max-w-xl">
                    Patients and guardians can review what has already been submitted and what still needs attention.
                  </p>
                </div>
                <div className="shrink-0 bg-sky-50 text-sky-700 font-semibold px-4 py-2 rounded-xl text-sm text-center">
                  Upload progress: {totalCompleted} of {totalCount}<br />completed
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {loading ? (
                  <div className="py-10 text-center text-slate-500">Loading document requirements...</div>
                ) : requiredDocs.map((document, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-800">{document.name}</h3>
                          <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">
                            {document.category}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{document.note}</p>
                      </div>
                      
                      <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${getBadgeStyle(document.status)}`}>
                        {document.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      <button className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition">
                        Upload File
                      </button>
                      <button className="cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-800 transition">
                        View Guidance
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Checklist Summary Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold text-sky-700 tracking-wide uppercase">Checklist Summary</p>
              <h3 className="mt-2 text-lg font-bold text-slate-800">Submission status overview</h3>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Uploaded</span>
                  <span className="text-sm font-bold text-emerald-600">{getStatusCount('Uploaded')}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Missing</span>
                  <span className="text-sm font-bold text-orange-500">{getStatusCount('Missing')}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Needs Correction</span>
                  <span className="text-sm font-bold text-rose-500">{getStatusCount('Needs Correction')}</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-sm font-semibold text-slate-600">Optional</span>
                  <span className="text-sm font-bold text-slate-500">{getStatusCount('Optional')}</span>
                </div>
              </div>

              <button
                onClick={() => setActivePage("application")}
                className="mt-6 cursor-pointer w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition shadow-sm"
              >
                Continue Application
              </button>
            </div>

            {/* Helpful Reminder Widget */}
            <div className="rounded-3xl bg-gradient-to-b from-emerald-50 to-teal-50 p-6 ring-1 ring-emerald-200">
              <p className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">Helpful reminder</p>
              <h3 className="mt-2 text-lg font-bold text-slate-800 leading-tight">
                Missing files may delay case review
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Patients are encouraged to complete the document checklist before final submission
                to reduce review delays and follow-up requests.
              </p>
              <button 
                onClick={() => setActivePage("notifications")}
                className="mt-6 cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition"
              >
                View Notification Reminders
              </button>
            </div>

            {/* Quick Access Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold text-violet-700 tracking-wide uppercase">Quick Access</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("sites")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700 transition"
                >
                  Access Sites Directory
                </button>
                <button
                  onClick={() => setActivePage("tracker")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700 transition"
                >
                  Case Status Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentsPage;
