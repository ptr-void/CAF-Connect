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
  const [activeTab, setActiveTab] = useState("overview");
  const [caseNotes, setCaseNotes] = useState<string[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem("caf_portal_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);

      if (user.assigned_site) {
        setLoading(true);
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

        fetch(`/api/x_1985733_cafsys/caf/notifications?site=${encodeURIComponent(user.assigned_site)}`, {
            headers: { "X-UserToken": (window as any).g_ck || "" }
        })
          .then(res => res.json())
          .then(data => {
             const payload = data.result || data;
             if (Array.isArray(payload)) {
                setCaseNotes(payload.slice(0, 5).map(n => n.message));
             }
          });
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
              <button 
                onClick={() => setActiveTab("overview")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold transition ${activeTab === 'overview' ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                Dashboard Overview
              </button>
              <button 
                onClick={() => setActiveTab("records")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold transition ${activeTab === 'records' ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                Patient Records
              </button>
              <button 
                onClick={() => setActiveTab("verification")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold transition ${activeTab === 'verification' ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                Document Verification
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
            {activeTab === 'overview' && (
              <>
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
                    <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-800">Welcome, Coordinator</h3>
                      <button onClick={() => setActiveTab("records")} className="text-sm font-semibold text-sky-700 hover:text-sky-800">
                        View Records →
                      </button>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      You are viewing real-time data for <strong>{currentUser?.assigned_site}</strong>. 
                      All case intake, document verification, and approvals are now connected directly to the database.
                      Use the sidebar to navigate between detailed record management and document processing.
                    </p>
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                       <div className="rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
                         <p className="text-sm font-bold text-sky-700 uppercase">Process Queue</p>
                         <p className="mt-2 text-3xl font-bold text-slate-800">{totalNew + totalPending}</p>
                         <p className="mt-1 text-xs text-slate-500">Cases needing immediate action</p>
                       </div>
                       <div className="rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
                         <p className="text-sm font-bold text-emerald-700 uppercase">Approval Rate</p>
                         <p className="mt-2 text-3xl font-bold text-slate-800">
                            {records.length > 0 ? Math.round((totalApproved / records.length) * 100) : 0}%
                         </p>
                         <p className="mt-1 text-xs text-slate-500">Of total cases processed at site</p>
                       </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-lg font-bold text-slate-800">Recent Activity Log</h3>
                    <div className="mt-6 space-y-4">
                      {caseNotes.length > 0 ? caseNotes.map((note, idx) => (
                        <div key={idx} className="flex gap-4 border-l-2 border-sky-500 pl-4 py-1">
                          <p className="text-sm text-slate-600 leading-relaxed">{note}</p>
                        </div>
                      )) : (
                        <p className="text-sm text-slate-500 italic">No recent activity logs found for this site.</p>
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}

            {(activeTab === 'records' || activeTab === 'verification') && (
              <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-sky-700">
                        {activeTab === 'verification' ? 'Document Queue' : 'Patient Records'}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-800">
                        {activeTab === 'verification' ? 'Pending Verifications' : 'Cases at your access site'}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {activeTab === 'verification' 
                          ? `Only showing applications with Missing Documents status for ${currentUser?.assigned_site}.`
                          : `Showing all patients who applied to ${currentUser?.assigned_site || "your site"}.`}
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
                          <th className="px-4 py-3 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading cases...</td></tr>
                        ) : filtered.filter(r => activeTab === 'records' || r.state === '4' || r.state === 'Missing Documents').length === 0 ? (
                          <tr><td colSpan={5} className="py-8 text-center text-slate-500">No cases found in this view.</td></tr>
                        ) : filtered
                            .filter(r => activeTab === 'records' || r.state === '4' || r.state === 'Missing Documents')
                            .map((record) => (
                            <tr key={record.sys_id} className="border-b border-slate-100">
                              <td className="px-4 py-4 font-semibold text-slate-800">{record.patient_name}</td>
                              <td className="px-4 py-4 text-sm text-slate-600">{record.number}</td>
                              <td className="px-4 py-4 text-sm text-slate-600">{record.medical_condition || "—"}</td>
                              <td className="px-4 py-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(record.state)}`}>
                                  {mapStateToLabel(record.state)}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <button className="cursor-pointer rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                                  View
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-emerald-700">Case Actions</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-800">Selected application</h3>
                    <div className="mt-5 space-y-3">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                        Total Cases at Site: <span className="font-bold">{records.length}</span>
                      </div>
                      <button className="cursor-pointer w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700">
                        Batch Approve
                      </button>
                    </div>
                  </div>
                  
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-violet-700">Recent Activity Log</p>
                    <div className="mt-4 space-y-3">
                      {caseNotes.slice(0, 3).map((note, idx) => (
                        <div key={idx} className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600 italic">
                          "{note}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StaffDashboardPage;
