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

type StaffDashboardPageProps = {
  setActivePage: (page: PageKey) => void;
};

function getStatusStyle(state: string) {
  if (state === "3" || state === "Approved") return "bg-emerald-100 text-emerald-700";
  if (state === "2" || state === "Pending Review" || state === "Pending") return "bg-amber-100 text-amber-700";
  if (state === "4" || state === "Missing Documents") return "bg-rose-100 text-rose-700";
  if (state === "1" || state === "Under Review") return "bg-sky-100 text-sky-700";
  if (state === "Referred") return "bg-violet-100 text-violet-700";
  return "bg-slate-100 text-slate-700";
}

function mapStateToLabel(state: string) {
  if (state === "1") return "Under Review";
  if (state === "2") return "Pending Review";
  if (state === "3") return "Approved";
  if (state === "4") return "Missing Documents";
  if (state === "Pending") return "Pending Review";
  return state || "Unknown";
}

function StaffDashboardPage({ setActivePage }: StaffDashboardPageProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    const userStr = localStorage.getItem("caf_portal_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);

      if (user.assigned_site) {
        fetch(`/api/x_1985733_cafsys/caf/staff/applications?site=${encodeURIComponent(user.assigned_site)}`, {
          headers: { "X-UserToken": (window as any).g_ck || "" },
        })
          .then((r) => r.json())
          .then((data) => {
            const payload = data.result || data;
            setRecords(Array.isArray(payload) ? payload : []);
          })
          .catch((err) => console.error("Error fetching staff applications:", err))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const filtered = records.filter((r) => {
    const matchSearch =
      !search ||
      r.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.number?.toLowerCase().includes(search.toLowerCase());
    const recordLabel = mapStateToLabel(r.state);
    const matchStatus = statusFilter === "All Status" || recordLabel === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalNew = records.filter((r) => r.state === "1" || r.state === "Pending").length;
  const totalPending = records.filter((r) => r.state === "2").length;
  const totalMissing = records.filter((r) => r.state === "4").length;
  const totalApproved = records.filter((r) => r.state === "3" || r.state === "Approved").length;

  const summaryCards = [
    { title: "New Applications", value: totalNew.toString(), note: "Under Review / New", bg: "bg-sky-50", text: "text-sky-700" },
    { title: "Pending Review", value: totalPending.toString(), note: "Needs coordinator action", bg: "bg-amber-50", text: "text-amber-700" },
    { title: "Missing Documents", value: totalMissing.toString(), note: "Waiting for patient upload", bg: "bg-rose-50", text: "text-rose-700" },
    { title: "Approved Cases", value: totalApproved.toString(), note: "Ready for release workflow", bg: "bg-emerald-50", text: "text-emerald-700" },
  ];

  const caseNotes = [
    "Prescription file needs correction before verification.",
    "Patient requested email updates for follow-ups.",
    "Site coordinator endorsed case to social service office.",
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white xl:flex">
          <div className="border-b border-slate-200 px-6 py-6">
            <h1 className="text-2xl font-bold text-sky-700">CAF Access Navigator</h1>
            <p className="mt-1 text-sm text-slate-500">Staff / Coordinator Dashboard</p>
            {currentUser?.assigned_site && (
              <p className="mt-2 rounded-xl bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">
                Site: {currentUser.assigned_site}
              </p>
            )}
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <button className="cursor-pointer w-full rounded-2xl bg-sky-600 px-4 py-3 text-left font-semibold text-white">
                Dashboard Overview
              </button>
              <button className="cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Patient Records
              </button>
              <button className="cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Document Verification
              </button>
              <button className="cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Site Filters
              </button>
            </div>
          </nav>

          <div className="border-t border-slate-200 p-4">
            <button
              onClick={() => setActivePage("landing")}
              className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Back to Home
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <button
                  onClick={() => setActivePage("landing")}
                  className="text-sm font-medium text-sky-700 hover:text-sky-800 xl:hidden"
                >
                  ← Back to Home
                </button>
                <h2 className="mt-2 text-3xl font-bold text-slate-800">Staff Dashboard</h2>
                <p className="mt-1 text-slate-500">
                  Manage patient cases for{" "}
                  <span className="font-semibold text-sky-700">
                    {currentUser?.assigned_site || "your assigned site"}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActivePage("notifications")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                >
                  Open Notifications
                </button>
                <button
                  onClick={() => setActivePage("admin")}
                  className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
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
                  className={`rounded-3xl p-6 shadow-sm ring-1 ring-slate-200 ${card.bg}`}
                >
                  <p className="text-sm font-semibold text-slate-600">{card.title}</p>
                  <p className={`mt-3 text-4xl font-bold ${card.text}`}>{card.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{card.note}</p>
                </div>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-sky-700">Patient Records</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-800">
                      Cases at your access site
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Showing only patients who applied to <strong>{currentUser?.assigned_site || "your site"}</strong>.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Search patient or reference..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="cursor-pointer rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="cursor-pointer rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    >
                      <option>All Status</option>
                      <option>Under Review</option>
                      <option>Pending Review</option>
                      <option>Missing Documents</option>
                      <option>Approved</option>
                      <option>Referred</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-sm text-slate-500">
                        <th className="px-4 py-3 font-semibold">Patient</th>
                        <th className="px-4 py-3 font-semibold">Reference</th>
                        <th className="px-4 py-3 font-semibold">Condition</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Date</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                            Loading cases from database...
                          </td>
                        </tr>
                      ) : filtered.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                            {records.length === 0
                              ? `No applications found for site: ${currentUser?.assigned_site || "No site assigned"}.`
                              : "No results match your search/filter."}
                          </td>
                        </tr>
                      ) : (
                        filtered.map((record) => (
                          <tr key={record.sys_id} className="border-b border-slate-100">
                            <td className="px-4 py-4 font-semibold text-slate-800">{record.patient_name}</td>
                            <td className="px-4 py-4 text-sm text-slate-600">{record.number}</td>
                            <td className="px-4 py-4 text-sm text-slate-600">{record.medical_condition || "—"}</td>
                            <td className="px-4 py-4">
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(record.state)}`}>
                                {mapStateToLabel(record.state)}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600">
                              {record.sys_created_on ? record.sys_created_on.split(" ")[0] : "N/A"}
                            </td>
                            <td className="px-4 py-4">
                              <button className="cursor-pointer rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                                View Case
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-emerald-700">Case Detail View</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">Selected application</h3>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Coordinator
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-700">{currentUser?.name || "—"}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Assigned Site
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {currentUser?.assigned_site || "No site assigned"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Total Cases
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-700">{records.length}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <button className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700">
                      Verify Documents
                    </button>
                    <button className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700">
                      Send Email Update
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
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

                  <button className="cursor-pointer mt-4 w-full rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700">
                    Save Note
                  </button>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 ring-1 ring-sky-200">
                  <p className="text-sm font-semibold text-slate-700">Workflow actions</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">Next coordinator steps</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    Review missing files, verify records, update case status, and notify the patient
                    through email or the portal.
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
