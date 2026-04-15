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

type StaffDashboardPageProps = {
  setActivePage: (page: PageKey) => void;
};

const summaryCards = [
  {
    title: "New Applications",
    value: "24",
    note: "Submitted today",
    bg: "bg-sky-50",
    text: "text-sky-700",
  },
  {
    title: "Pending Review",
    value: "18",
    note: "Needs coordinator action",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    title: "Missing Documents",
    value: "9",
    note: "Waiting for patient upload",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  {
    title: "Approved Cases",
    value: "31",
    note: "Ready for release workflow",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
];

const patientRecords = [
  {
    patient: "Juan Dela Cruz",
    reference: "CAF-2026-0012",
    site: "Jose R. Reyes MMC",
    status: "Pending Review",
    date: "Apr 14, 2026",
  },
  {
    patient: "Maria Santos",
    reference: "CAF-2026-0013",
    site: "East Avenue Medical Center",
    status: "Missing Documents",
    date: "Apr 14, 2026",
  },
  {
    patient: "Pedro Reyes",
    reference: "CAF-2026-0014",
    site: "Philippine General Hospital",
    status: "Approved",
    date: "Apr 13, 2026",
  },
  {
    patient: "Angela Cruz",
    reference: "CAF-2026-0015",
    site: "Vicente Sotto Memorial Medical Center",
    status: "Under Review",
    date: "Apr 13, 2026",
  },
  {
    patient: "Lorna Bautista",
    reference: "CAF-2026-0016",
    site: "Southern Philippines Medical Center",
    status: "Referred",
    date: "Apr 12, 2026",
  },
];

const caseNotes = [
  "Prescription file needs correction before verification.",
  "Patient requested SMS updates only for follow-ups.",
  "Site coordinator endorsed case to social service office.",
];

function getStatusStyle(status: string) {
  if (status === "Approved") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pending Review") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Missing Documents") {
    return "bg-rose-100 text-rose-700";
  }

  if (status === "Under Review") {
    return "bg-sky-100 text-sky-700";
  }

  if (status === "Referred") {
    return "bg-violet-100 text-violet-700";
  }

  return "bg-slate-100 text-slate-700";
}

function StaffDashboardPage({ setActivePage }: StaffDashboardPageProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white xl:flex">
          <div className="border-b border-slate-200 px-6 py-6">
            <h1 className="text-2xl font-bold text-sky-700">CAF Access Navigator</h1>
            <p className="mt-1 text-sm text-slate-500">Staff / Coordinator Dashboard</p>
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-left font-semibold text-white">
                Dashboard Overview
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Patient Records
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Document Verification
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                SMS Updates
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Site Filters
              </button>
            </div>
          </nav>

          <div className="border-t border-slate-200 p-4">
            <button className="cursor-pointer" onClick={() => setActivePage("landing")}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Back to Home
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <button className="cursor-pointer" onClick={() => setActivePage("landing")}
                  className="text-sm font-medium text-sky-700 hover:text-sky-800 xl:hidden"
                >
                  â†?Back to Home
                </button>
                <h2 className="mt-2 text-3xl font-bold text-slate-800">Staff Dashboard</h2>
                <p className="mt-1 text-slate-500">
                  Manage patient cases, verify documents, and send updates efficiently.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="cursor-pointer" onClick={() => setActivePage("notifications")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                >
                  Open Notifications
                </button>
                <button className="cursor-pointer" onClick={() => setActivePage("admin")}
                  className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Go to Admin Dashboard
                </button>
              </div>
            </div>
          </header>

          <div className="space-y-6 p-6">
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-3xl p-6 shadow-sm border border-white/60 shadow-lg ${card.bg}`}
                >
                  <p className="text-sm font-semibold text-slate-600">{card.title}</p>
                  <p className={`mt-3 text-4xl font-bold ${card.text}`}>{card.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{card.note}</p>
                </div>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
              <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-sky-700">Patient Records</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-800">
                      Cases assigned to coordinators
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Review applications, track status, and open case details for follow-up.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <input
                      type="text"
                      placeholder="Search patient"
                      className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                    <select className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>All Sites</option>
                      <option>Jose R. Reyes MMC</option>
                      <option>East Avenue Medical Center</option>
                      <option>Philippine General Hospital</option>
                    </select>
                    <select className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>All Status</option>
                      <option>Pending Review</option>
                      <option>Missing Documents</option>
                      <option>Approved</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-sm text-slate-500">
                        <th className="px-4 py-3 font-semibold">Patient</th>
                        <th className="px-4 py-3 font-semibold">Reference</th>
                        <th className="px-4 py-3 font-semibold">Site</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Date</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientRecords.map((record) => (
                        <tr key={record.reference} className="border-b border-slate-100">
                          <td className="px-4 py-4 font-semibold text-slate-800">{record.patient}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{record.reference}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{record.site}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                record.status
                              )}`}
                            >
                              {record.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600">{record.date}</td>
                          <td className="px-4 py-4">
                            <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                              View Case
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
                  <p className="text-sm font-semibold text-emerald-700">Case Detail View</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">Selected application</h3>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Patient
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-700">Juan Dela Cruz</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </p>
                      <p className="mt-2 text-sm font-medium text-amber-700">Pending Review</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Assigned Site
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        Jose R. Reyes MMC
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <button className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-4 py-3 font-semibold text-white hover:bg-sky-700">
                      Verify Documents
                    </button>
                    <button className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700">
                      Send SMS Update
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
                  <p className="text-sm font-semibold text-violet-700">Notes / Comments</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">Coordinator notes</h3>

                  <div className="mt-5 space-y-3">
                    {caseNotes.map((note) => (
                      <div key={note} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        {note}
                      </div>
                    ))}
                  </div>

                  <textarea
                    rows={4}
                    placeholder="Add internal note or follow-up comment"
                    className="mt-5 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
                  />

                  <button className="mt-4 w-full rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700">
                    Save Note
                  </button>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 border border-white/60 shadow-lg">
                  <p className="text-sm font-semibold text-slate-700">Workflow actions</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">Next coordinator steps</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    Review missing files, verify records, update case status, and notify the patient
                    through SMS or the portal.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StaffDashboardPage;
