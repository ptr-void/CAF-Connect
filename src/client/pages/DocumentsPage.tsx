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

const requiredDocuments = [
  {
    name: "Medical Abstract",
    category: "Clinical Document",
    status: "Missing",
    note: "Request the latest signed medical abstract from the treating physician or hospital.",
  },
  {
    name: "Valid Government ID",
    category: "Identity Document",
    status: "Uploaded",
    note: "Patient or authorized representative ID must be clear and readable.",
  },
  {
    name: "Doctor's Prescription",
    category: "Treatment Support",
    status: "Needs Correction",
    note: "Please upload a complete prescription with signature and date.",
  },
  {
    name: "Laboratory / Diagnostic Results",
    category: "Clinical Supporting File",
    status: "Uploaded",
    note: "Attach recent relevant diagnostic or laboratory results if available.",
  },
  {
    name: "Proof of Billing or Treatment Plan",
    category: "Financial / Hospital Requirement",
    status: "Missing",
    note: "Billing statement, treatment quotation, or treatment plan may be required.",
  },
  {
    name: "Authorization Letter",
    category: "Guardian / Representative",
    status: "Optional",
    note: "Needed only when a family member or guardian is applying on behalf of the patient.",
  },
];

function getStatusClasses(status: string) {
  if (status === "Uploaded") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Missing") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Needs Correction") {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-slate-100 text-slate-700";
}

function DocumentsPage({ setActivePage }: DocumentsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Document Requirements Guide</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Review the required documents, see status markers, and upload missing or corrected
              files before submitting the patient application.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("eligibility")}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Back to Eligibility
            </button>
            <button
              onClick={() => setActivePage("application")}
              className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
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
                  <p className="mt-2 text-sm text-slate-500">
                    Patients and guardians can review what has already been submitted and what still
                    needs attention.
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 ring-1 ring-sky-100">
                  Upload progress: 2 of 6 completed
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {requiredDocuments.map((document) => (
                  <div
                    key={document.name}
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

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          document.status
                        )}`}
                      >
                        {document.status}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                      >
                        View Guidance
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Upload Area</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Drag and drop document upload</h2>
              <p className="mt-2 text-sm text-slate-500">
                Upload scanned or photographed files clearly. Supported formats may include PDF,
                JPG, and PNG depending on the system setup.
              </p>

              <div className="mt-6 rounded-3xl border-2 border-dashed border-sky-300 bg-sky-50 px-6 py-12 text-center">
                <div className="mx-auto max-w-md">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-sky-700 shadow-sm">
                    ↑
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-800">Drop files here</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Drag your documents into this area or click the button below to browse files
                    from your device.
                  </p>
                  <button
                    type="button"
                    className="mt-6 rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-emerald-50 px-4 py-4 ring-1 ring-emerald-100">
                  <p className="text-sm font-semibold text-emerald-700">Clear image quality</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Ensure text, names, dates, and signatures are readable.
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 px-4 py-4 ring-1 ring-amber-100">
                  <p className="text-sm font-semibold text-amber-700">Correct file type</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Upload the requested document under the correct checklist item.
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 px-4 py-4 ring-1 ring-violet-100">
                  <p className="text-sm font-semibold text-violet-700">Review before submit</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Check if corrected files replaced the outdated or incomplete version.
                  </p>
                </div>
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
              <p className="text-sm font-semibold text-sky-700">Checklist Summary</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Submission status overview</h3>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-600">Uploaded</span>
                  <span className="text-sm font-semibold text-emerald-700">2</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-600">Missing</span>
                  <span className="text-sm font-semibold text-amber-700">2</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-600">Needs Correction</span>
                  <span className="text-sm font-semibold text-rose-700">1</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-600">Optional</span>
                  <span className="text-sm font-semibold text-slate-700">1</span>
                </div>
              </div>

              <button
                onClick={() => setActivePage("application")}
                className="mt-6 w-full rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
              >
                Continue Application
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

              <button
                onClick={() => setActivePage("notifications")}
                className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                View Notification Reminders
              </button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-violet-700">Quick Access</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("sites")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Access Sites Directory
                </button>
                <button
                  onClick={() => setActivePage("tracker")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Case Status Tracker
                </button>
                <button
                  onClick={() => setActivePage("help")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
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
