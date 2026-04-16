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

function mapStateToLabel(state: string) {
  if (state === "1") return "Under Review";
  if (state === "2") return "Pending Review";
  if (state === "3") return "Approved";
  if (state === "4") return "Missing Documents";
  if (state === "Pending") return "Pending Review";
  return state || "Unknown";
}

function getStatusBadge(state: string) {
  const label = mapStateToLabel(state);
  const map: Record<string, string> = {
    "Under Review": "bg-sky-100 text-sky-700",
    "Pending Review": "bg-amber-100 text-amber-700",
    "Approved": "bg-emerald-100 text-emerald-700",
    "Missing Documents": "bg-rose-100 text-rose-700",
    "Referred": "bg-violet-100 text-violet-700",
  };
  return { label, cls: map[label] || "bg-slate-100 text-slate-600" };
}

function StaffDashboardPage({ setActivePage }: StaffDashboardPageProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  const [isProcessing, setIsProcessing] = useState(false);

  // Case detail modal
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [updateNote, setUpdateNote] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchRecords = (site: string) => {
    setLoading(true);
    fetch(`/api/x_1985733_cafsys/caf/staff/applications?site=${encodeURIComponent(site)}`, {
      headers: { "X-UserToken": (window as any).g_ck || "" },
    })
      .then(r => r.json())
      .then(data => {
        const payload = data.result || data;
        setRecords(Array.isArray(payload) ? payload : []);
      })
      .catch(err => console.error("Error fetching staff applications:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const userStr = localStorage.getItem("caf_portal_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      if (user.assigned_site) fetchRecords(user.assigned_site);
      else setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleBatchApprove = () => {
    if (!currentUser?.assigned_site) return;
    if (!confirm("Approve ALL pending cases for this site?")) return;
    setIsProcessing(true);
    fetch("/api/x_1985733_cafsys/caf/staff/batch_approve", {
      method: 'POST',
      headers: { "X-UserToken": (window as any).g_ck || "", "Content-Type": "application/json" },
      body: JSON.stringify({ data: { site: currentUser.assigned_site } })
    })
      .then(res => res.json())
      .then(data => { alert(`Approved ${data.approved_count || 0} applications.`); fetchRecords(currentUser.assigned_site); })
      .catch(err => alert("Error: " + err.message))
      .finally(() => setIsProcessing(false));
  };

  const handleViewCase = (sysId: string) => {
    fetch(`/api/x_1985733_cafsys/caf/staff/applications/${sysId}`, {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then(res => res.json())
      .then(data => setSelectedCase(data.result || data));
  };

  const handleUpdateStatus = (state: string) => {
    if (!selectedCase) return;
    setIsUpdatingStatus(true);
    fetch(`/api/x_1985733_cafsys/caf/staff/applications/${selectedCase.sys_id}/status`, {
      method: 'POST',
      headers: { "X-UserToken": (window as any).g_ck || "", "Content-Type": "application/json" },
      body: JSON.stringify({ data: { state, note: updateNote } })
    })
      .then(res => res.json())
      .then(() => { alert("Status updated."); setSelectedCase(null); setUpdateNote(""); fetchRecords(currentUser.assigned_site); })
      .catch(err => alert("Error: " + err.message))
      .finally(() => setIsUpdatingStatus(false));
  };

  const filtered = records.filter(r => {
    const matchSearch = !search || r.patient_name?.toLowerCase().includes(search.toLowerCase()) || r.number?.toLowerCase().includes(search.toLowerCase());
    const badge = getStatusBadge(r.state);
    const matchStatus = statusFilter === "All" || badge.label === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalNew = records.filter(r => r.state === "1" || r.state === "Pending").length;
  const totalPending = records.filter(r => r.state === "2").length;
  const totalMissing = records.filter(r => r.state === "4").length;
  const totalApproved = records.filter(r => r.state === "3" || r.state === "Approved").length;

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "records", label: "Records", icon: "📋" },
    { id: "verification", label: "Verification", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <div className="flex min-h-screen">

        {/* ── Sidebar ── */}
        <aside className="hidden w-64 flex-col bg-slate-900 xl:flex sticky top-0 h-screen">
          <div className="px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-sm font-black">S</span>
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-tight">Staff Portal</h1>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Case Manager</p>
              </div>
            </div>
            {currentUser?.assigned_site && (
              <div className="mt-4 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <p className="text-[10px] font-bold text-sky-300 uppercase truncate">{currentUser.assigned_site}</p>
              </div>
            )}
          </div>

          <nav className="flex-1 px-3 mt-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer w-full flex items-center gap-3 rounded-xl px-4 py-3 mb-1 text-left text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"></div>}
              </button>
            ))}
          </nav>

          <div className="p-3 space-y-2">
            {currentUser?.account_type === 'Administrator' && (
              <button
                onClick={() => setActivePage("admin")}
                className="cursor-pointer w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-400 hover:text-slate-200 hover:bg-white/5 transition"
              >
                <span className="text-base">⚙️</span> Admin Panel
              </button>
            )}
            <button
              onClick={() => setActivePage("landing")}
              className="cursor-pointer w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/20 transition text-center"
            >
              ← Exit Dashboard
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100">
            <div className="px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {activeTab === 'overview' ? 'Site Overview' : activeTab === 'records' ? 'Patient Records' : 'Document Verification'}
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Processing intake for <span className="text-sky-600 font-bold">{currentUser?.assigned_site || "—"}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {currentUser?.account_type === 'Administrator' && (
                  <button
                    onClick={() => setActivePage("admin")}
                    className="cursor-pointer px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-sky-400 hover:text-sky-700 transition"
                  >
                    Admin Controls
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-8">

            {/* ══ OVERVIEW ══ */}
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "New Cases", value: totalNew, color: "sky", icon: "📥" },
                    { label: "Pending Review", value: totalPending, color: "amber", icon: "⏳" },
                    { label: "Missing Docs", value: totalMissing, color: "rose", icon: "📎" },
                    { label: "Approved", value: totalApproved, color: "emerald", icon: "✅" },
                  ].map(card => (
                    <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
                        <span className="text-lg">{card.icon}</span>
                      </div>
                      <p className={`text-3xl font-black text-${card.color}-600 tracking-tight`}>
                        {loading ? "..." : card.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Two-column */}
                <div className="grid gap-6 xl:grid-cols-5">

                  {/* Summary */}
                  <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-800">Site Performance</h3>
                      <button onClick={() => setActiveTab("records")} className="cursor-pointer text-xs font-bold text-sky-600 hover:text-sky-700 transition">
                        View All Records →
                      </button>
                    </div>
                    <div className="p-6 grid gap-4 md:grid-cols-2">
                      <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                        <p className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">Active Queue</p>
                        <p className="text-4xl font-black text-slate-900 mt-2">{totalNew + totalPending}</p>
                        <p className="text-xs text-slate-400 mt-1">Cases needing action</p>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                        <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Approval Rate</p>
                        <p className="text-4xl font-black text-slate-900 mt-2">
                          {records.length > 0 ? Math.round((totalApproved / records.length) * 100) : 0}%
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Site performance</p>
                      </div>
                    </div>

                    {/* Batch Approve */}
                    <div className="mx-6 mb-6 p-5 bg-slate-900 rounded-xl text-white flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-black">Batch Approval</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Auto-approve all pending cases</p>
                      </div>
                      <button
                        disabled={isProcessing}
                        onClick={handleBatchApprove}
                        className="cursor-pointer px-5 py-2.5 bg-emerald-500 rounded-xl text-sm font-bold hover:bg-emerald-400 transition disabled:opacity-50 whitespace-nowrap"
                      >
                        {isProcessing ? "Processing..." : "Approve All"}
                      </button>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-50">
                      <h3 className="text-sm font-black text-slate-800">Status Breakdown</h3>
                    </div>
                    <div className="p-6 space-y-3">
                      {[
                        { label: "Under Review", count: totalNew, cls: "bg-sky-500" },
                        { label: "Pending Review", count: totalPending, cls: "bg-amber-500" },
                        { label: "Missing Docs", count: totalMissing, cls: "bg-rose-500" },
                        { label: "Approved", count: totalApproved, cls: "bg-emerald-500" },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.cls} shrink-0`}></div>
                          <span className="text-sm text-slate-600 flex-1">{item.label}</span>
                          <span className="text-sm font-black text-slate-800">{item.count}</span>
                        </div>
                      ))}
                      {records.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase">Total Cases</span>
                          <span className="text-lg font-black text-slate-900">{records.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══ RECORDS / VERIFICATION ══ */}
            {(activeTab === 'records' || activeTab === 'verification') && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="text"
                      placeholder="Search patient name or ID..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition w-full sm:w-64"
                    />
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400 transition"
                    >
                      <option value="All">All Status</option>
                      <option>Under Review</option>
                      <option>Pending Review</option>
                      <option>Missing Documents</option>
                      <option>Approved</option>
                    </select>
                  </div>
                  {activeTab === 'verification' && (
                    <span className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full">Showing Missing Documents only</span>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        <th className="py-3 px-5">Patient</th>
                        <th className="py-3 px-5">Tracking ID</th>
                        <th className="py-3 px-5">Diagnosis</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {loading ? (
                        <tr><td colSpan={5} className="py-16 text-center text-sm text-slate-400 italic">Loading records...</td></tr>
                      ) : filtered.filter(r => activeTab === 'records' || r.state === '4' || r.state === 'Missing Documents').length === 0 ? (
                        <tr><td colSpan={5} className="py-16 text-center text-sm text-slate-400 italic">No records match current filters.</td></tr>
                      ) : filtered
                          .filter(r => activeTab === 'records' || r.state === '4' || r.state === 'Missing Documents')
                          .map(record => {
                            const badge = getStatusBadge(record.state);
                            return (
                              <tr key={record.sys_id} className="group hover:bg-sky-50/30 transition">
                                <td className="py-3.5 px-5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm shrink-0">
                                      {record.patient_name?.charAt(0) || "P"}
                                    </div>
                                    <span className="font-bold text-sm text-slate-800">{record.patient_name}</span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-5 text-sm text-slate-400 font-mono">{record.number}</td>
                                <td className="py-3.5 px-5 text-sm text-slate-500">{record.medical_condition || "—"}</td>
                                <td className="py-3.5 px-5">
                                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${badge.cls}`}>
                                    {badge.label}
                                  </span>
                                </td>
                                <td className="py-3.5 px-5 text-right">
                                  <button
                                    onClick={() => handleViewCase(record.sys_id)}
                                    className="cursor-pointer px-3 py-1.5 text-xs font-bold text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition opacity-0 group-hover:opacity-100"
                                  >
                                    Review
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Case Detail Modal ── */}
      {selectedCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-black">Case: {selectedCase.number}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedCase.patient_name}</p>
              </div>
              <button onClick={() => { setSelectedCase(null); setUpdateNote(""); }} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition text-sm">✕</button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_240px]">

                {/* Left: Patient info */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Patient Information</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Full Name", value: selectedCase.patient_name },
                        { label: "Diagnosis", value: selectedCase.medical_condition },
                        { label: "Email", value: selectedCase.email },
                        { label: "Phone", value: selectedCase.phone_number },
                      ].map(field => (
                        <div key={field.label} className="bg-slate-50 rounded-xl p-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{field.label}</p>
                          <p className="text-sm font-semibold text-slate-800 mt-1">{field.value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Medical Abstract</h4>
                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                      <p className="text-sm text-slate-700 leading-relaxed italic">
                        "{selectedCase.medical_abstract || "No abstract provided."}"
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Documents</h4>
                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📄</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Case File</p>
                          <p className="text-xs text-slate-400">{selectedCase.document_url ? "Attached" : "No file"}</p>
                        </div>
                      </div>
                      {selectedCase.document_url && (
                        <a href={selectedCase.document_url} target="_blank" className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold">Open</a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Staff Note</h4>
                    <textarea
                      value={updateNote}
                      onChange={e => setUpdateNote(e.target.value)}
                      placeholder="Add a note before updating status..."
                      className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Update Status</h4>
                  <button
                    onClick={() => handleUpdateStatus("3")}
                    disabled={isUpdatingStatus}
                    className="cursor-pointer w-full py-3 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition disabled:opacity-50"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus("4")}
                    disabled={isUpdatingStatus}
                    className="cursor-pointer w-full py-3 border border-rose-200 text-rose-500 text-sm font-bold rounded-xl hover:bg-rose-50 transition disabled:opacity-50"
                  >
                    Missing Docs
                  </button>
                  <button
                    onClick={() => handleUpdateStatus("Referred")}
                    disabled={isUpdatingStatus}
                    className="cursor-pointer w-full py-3 border border-slate-200 text-slate-400 text-sm font-bold rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
                  >
                    Refer Case
                  </button>

                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Current</h4>
                    {(() => {
                      const b = getStatusBadge(selectedCase.state);
                      return <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${b.cls}`}>{b.label}</span>;
                    })()}
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Requested Amount</h4>
                    <p className="text-lg font-black text-slate-800">₱{Number(selectedCase.requested_amount || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffDashboardPage;
