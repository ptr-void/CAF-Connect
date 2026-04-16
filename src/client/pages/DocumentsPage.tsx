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
        const result = data.result || data;
        setRequiredDocs(Array.isArray(result) ? result : []);
      })
      .catch(err => console.error("Error fetching doc requirements:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Document Requirements Guide</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Review the required documents and policies below before proceeding to fill out the patient application.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("eligibility")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Back to Eligibility
            </button>
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Continue to Application Form
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
                    Checklist for CAF document submission
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Patients and guardians should prepare the following physical and digital copies.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {loading ? (
                  <div className="py-10 text-center text-slate-500">Loading document requirements from database...</div>
                ) : requiredDocs.length === 0 ? (
                  <div className="py-10 text-center text-slate-500">No document requirements defined currently.</div>
                ) : requiredDocs.map((document) => (
                  <div
                    key={document.sys_id || document.name}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-800">{document.name}</h3>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                            {document.category}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{document.note}</p>
                      </div>

                      <span className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                        Required
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-violet-700">Helpful Notes</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Document guidance by category</h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-800">Clinical Documents</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Include the latest medical abstract, diagnosis summary, and related diagnostic
                    findings if requested by the assigned site.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-800">Identity Documents</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Government-issued IDs should be valid, complete, and clearly visible in the
                    uploaded image or scan.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-800">Financial / Billing Files</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Some cases may require billing statements, treatment plans, or hospital cost
                    estimates for assessment.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-800">Representative Documents</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    When a guardian or family member applies on behalf of the patient, an
                    authorization or relationship document may be requested.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Next Steps</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Ready to Apply?</h3>
              <p className="mt-3 text-sm text-slate-600">
                You will be asked to upload clear photographs or scans of these documents in the official application form.
              </p>

              <button
                onClick={() => setActivePage("application")}
                className="mt-6 cursor-pointer w-full rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
              >
                Start Application Form
              </button>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-100 to-sky-100 p-6 ring-1 ring-emerald-200">
              <p className="text-sm font-semibold text-slate-700">Helpful reminder</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Missing files may delay case review
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Patients are encouraged to complete the document checklist before final submission
                to reduce review delays and follow-up requests.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-violet-700">Quick Access</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("sites")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Access Sites Directory
                </button>
                <button
                  onClick={() => setActivePage("tracker")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Case Status Tracker
                </button>
                <button
                  onClick={() => setActivePage("help")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Help & Support
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
