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
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchRecords = (site: string) => {
    setLoading(true);
    fetch(`/api/x_1985733_cafsys/caf/staff/applications?site=${encodeURIComponent(site)}`, {
      headers: { "X-UserToken": (window as any).g_ck || "" },
    })
      .then((r) => r.json())
      .then((data) => {
        const payload = data.result || data;
        setRecords(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => console.error("Error fetching staff applications:", err))
      .finally(() => setLoading(false));

    fetch(`/api/x_1985733_cafsys/caf/notifications?site=${encodeURIComponent(site)}`, {
        headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then(res => res.json())
      .then(data => {
         const payload = data.result || data;
         if (Array.isArray(payload)) {
            setCaseNotes(payload.slice(0, 5).map(n => n.message));
         }
      });
  };

  useEffect(() => {
    const userStr = localStorage.getItem("caf_portal_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      if (user.assigned_site) {
        fetchRecords(user.assigned_site);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleBatchApprove = () => {
    if (!currentUser?.assigned_site) return;
    if (!confirm("Are you sure you want to approve ALL pending cases for this site?")) return;

    setIsProcessing(true);
    fetch("/api/x_1985733_cafsys/caf/staff/batch_approve", {
        method: 'POST',
        headers: { 
            "X-UserToken": (window as any).g_ck || "",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: { site: currentUser.assigned_site } })
    })
    .then(res => res.json())
    .then(data => {
        alert(`Successfully approved ${data.approved_count || 0} applications.`);
        fetchRecords(currentUser.assigned_site);
    })
    .catch(err => alert("Error: " + err.message))
    .finally(() => setIsProcessing(false));
  };

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
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white xl:flex sticky top-0 h-screen">
          <div className="border-b border-slate-200 px-6 py-8">
            <h1 className="text-xl font-black tracking-tight text-slate-800">STAFF PORTAL</h1>
            <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Management Console</p>
            {currentUser?.assigned_site && (
              <div className="mt-4 flex items-center gap-2 overflow-hidden truncate">
                 <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0"></div>
                 <p className="text-[10px] font-black text-sky-700 uppercase truncate">{currentUser.assigned_site}</p>
              </div>
            )}
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-bold transition flex items-center gap-3 ${activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                <div className={`w-2 h-2 rounded-full ${activeTab === 'overview' ? 'bg-sky-400' : 'bg-slate-300'}`}></div>
                Overview
              </button>
              <button 
                onClick={() => setActiveTab("records")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-bold transition flex items-center gap-3 ${activeTab === 'records' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                <div className={`w-2 h-2 rounded-full ${activeTab === 'records' ? 'bg-sky-400' : 'bg-slate-300'}`}></div>
                Patient Records
              </button>
              <button 
                onClick={() => setActiveTab("verification")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-bold transition flex items-center gap-3 ${activeTab === 'verification' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                <div className={`w-2 h-2 rounded-full ${activeTab === 'verification' ? 'bg-sky-400' : 'bg-slate-300'}`}></div>
                Verification
              </button>
            </div>
          </nav>

          <div className="p-4">
            <button
              onClick={() => setActivePage("landing")}
              className="cursor-pointer w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 font-bold text-slate-600 hover:border-sky-500 transition"
            >
              Exit Dashboard
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white px-8 py-8 border-b border-slate-200">
             <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Case Management</h2>
                  <p className="mt-2 text-slate-500 font-medium">Processing intake for <span className="text-sky-600 font-bold">{currentUser?.assigned_site}</span>.</p>
                </div>
                {currentUser?.account_type === 'Administrator' && (
                   <button 
                      onClick={() => setActivePage("admin")} 
                      className="cursor-pointer rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-800 transition"
                   >
                     Admin Controls
                   </button>
                )}
             </div>
          </header>

          <div className="p-8 space-y-8">
            {activeTab === 'overview' && (
              <>
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {summaryCards.map((card) => (
                    <div key={card.title} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm transition hover:shadow-md">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.title}</p>
                      <p className={`mt-4 text-5xl font-black tracking-tight ${card.text}`}>{card.value}</p>
                      <p className="mt-2 text-xs font-bold text-slate-400">{card.note}</p>
                    </div>
                  ))}
                </section>

                <section className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="mb-8 flex items-center justify-between border-b border-slate-50 pb-6">
                      <h3 className="text-2xl font-black text-slate-800">Operational Summary</h3>
                      <button onClick={() => setActiveTab("records")} className="text-xs font-black text-sky-600 hover:text-sky-700 uppercase tracking-wider underline">
                        View Detailed Records
                      </button>
                    </div>
                    
                    <div className="grid gap-8 md:grid-cols-2">
                       <div className="p-8 bg-sky-50 rounded-[2rem] border border-sky-100 group shadow-sm">
                         <p className="text-[10px] font-black text-sky-700 uppercase tracking-widest">Active Intake Queue</p>
                         <p className="mt-4 text-6xl font-black text-slate-900">{totalNew + totalPending}</p>
                         <p className="mt-2 text-xs font-bold text-slate-400 group-hover:text-sky-600 transition">Action required on these cases</p>
                       </div>
                       <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 group shadow-sm">
                         <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Site Approval Rate</p>
                         <p className="mt-4 text-6xl font-black text-slate-900">
                            {records.length > 0 ? Math.round((totalApproved / records.length) * 100) : 0}%
                         </p>
                         <p className="mt-2 text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition">Performance across all site cases</p>
                       </div>
                    </div>

                    <div className="mt-8 p-8 bg-slate-900 rounded-[2rem] text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-xl font-black">Ready for Batch Approval?</h4>
                                <p className="mt-1 text-slate-400 font-medium">Auto-approve all pending cases for {currentUser?.assigned_site}.</p>
                            </div>
                            <button 
                                disabled={isProcessing}
                                onClick={handleBatchApprove}
                                className="px-8 py-4 bg-emerald-500 rounded-2xl font-black text-sm hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                            >
                                {isProcessing ? "Processing..." : "Approve All"}
                            </button>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-6">Recent Activity Log</h3>
                    <div className="space-y-6">
                      {caseNotes.length > 0 ? caseNotes.map((note, idx) => (
                        <div key={idx} className="flex gap-4 group">
                          <div className="shrink-0 w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 group-hover:scale-150 transition"></div>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{note}"</p>
                        </div>
                      )) : (
                        <p className="text-sm text-slate-400 italic">No recent activity logs recorded.</p>
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}

            {(activeTab === 'records' || activeTab === 'verification') && (
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm min-h-[600px]">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 pb-10 border-b border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">
                      {activeTab === 'verification' ? 'Fulfillment Queue' : 'Active Registry'}
                    </p>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                      {activeTab === 'verification' ? 'Pending Documents' : 'Site Database'}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <input
                      type="text"
                      placeholder="Search patient registry..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-sky-500 transition w-full md:w-64"
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-sky-500 transition"
                    >
                      <option>All Status</option>
                      <option>Under Review</option>
                      <option>Pending Review</option>
                      <option>Missing Documents</option>
                      <option>Approved</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                          <th className="pb-4 px-4">Patient Profile</th>
                          <th className="pb-4 px-4">Tracking ID</th>
                          <th className="pb-4 px-4">Medical Type</th>
                          <th className="pb-4 px-4">Current Status</th>
                          <th className="pb-4 px-4">Management</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {loading ? (
                          <tr><td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic underline decoration-sky-300">Synchronizing records...</td></tr>
                        ) : filtered.filter(r => activeTab === 'records' || r.state === '4' || r.state === 'Missing Documents').length === 0 ? (
                          <tr><td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic">No records found matching current isolation criteria.</td></tr>
                        ) : filtered
                            .filter(r => activeTab === 'records' || r.state === '4' || r.state === 'Missing Documents')
                            .map((record) => (
                            <tr key={record.sys_id} className="group hover:bg-slate-50 transition">
                              <td className="py-6 px-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-black text-lg">
                                      {record.patient_name?.charAt(0) || "P"}
                                   </div>
                                   <div className="font-black text-slate-800">{record.patient_name}</div>
                                </div>
                              </td>
                              <td className="py-6 px-4 font-bold text-slate-400 text-sm">{record.number}</td>
                              <td className="py-6 px-4 font-bold text-slate-500 text-sm underline decoration-sky-200 underline-offset-4">{record.medical_condition || "Intake Assessment"}</td>
                              <td className="py-6 px-4">
                                <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-tight ${getStatusStyle(record.state)}`}>
                                  {mapStateToLabel(record.state)}
                                </span>
                              </td>
                              <td className="py-6 px-4">
                                <button className="cursor-pointer px-4 py-2 opacity-0 group-hover:opacity-100 bg-slate-900 rounded-xl font-bold text-xs text-white hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                                  View Case
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
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
