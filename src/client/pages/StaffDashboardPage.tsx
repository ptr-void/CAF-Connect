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
  const styles: Record<string, string> = {
    "Under Review": "bg-sky-100 text-sky-700",
    "Pending Review": "bg-amber-100 text-amber-700",
    "Approved": "bg-emerald-100 text-emerald-700",
    "Missing Documents": "bg-rose-100 text-rose-700",
    "Referred": "bg-violet-100 text-violet-700",
  };
  return { label, cls: styles[label] || "bg-slate-100 text-slate-600" };
}

function StaffDashboardPage({ setActivePage }: StaffDashboardPageProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const tabItems = [
    { id: "overview", label: "Overview" },
    { id: "records", label: "Patient Records" },
    { id: "verification", label: "Verification Queue" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Staff Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-800">Case Management</h1>
            <p className="mt-2 text-slate-600">
              Processing intake for <span className="font-semibold text-sky-700">{currentUser?.assigned_site || "—"}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {currentUser?.account_type === 'Administrator' && (
              <button
                onClick={() => setActivePage("admin")}
                className="cursor-pointer rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Admin Controls
              </button>
            )}
            <button
              onClick={() => setActivePage("landing")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Exit Dashboard
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2">
          {tabItems.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-emerald-300 hover:text-emerald-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══ OVERVIEW TAB ══ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "New Applications", value: loading ? "..." : totalNew, sub: "Under review / new", color: "text-sky-700" },
                { title: "Pending Review", value: loading ? "..." : totalPending, sub: "Needs coordinator action", color: "text-amber-700" },
                { title: "Missing Documents", value: loading ? "..." : totalMissing, sub: "Waiting for patient upload", color: "text-rose-700" },
                { title: "Approved Cases", value: loading ? "..." : totalApproved, sub: "Ready for release workflow", color: "text-emerald-700" },
              ].map(card => (
                <div key={card.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-500">{card.title}</p>
                  <p className={`mt-3 text-3xl font-bold ${card.color}`}>{card.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{card.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
              {/* Operational Summary */}
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">Operational Summary</h3>
                  <button onClick={() => setActiveTab("records")} className="cursor-pointer text-sm font-semibold text-sky-700 hover:text-sky-800">
                    View Detailed Records →
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
                    <p className="text-sm font-semibold text-sky-700">Active Intake Queue</p>
                    <p className="mt-3 text-4xl font-bold text-slate-800">{totalNew + totalPending}</p>
                    <p className="mt-2 text-sm text-slate-500">Action required on these cases</p>
                  </div>
                  <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
                    <p className="text-sm font-semibold text-emerald-700">Site Approval Rate</p>
                    <p className="mt-3 text-4xl font-bold text-slate-800">
                      {records.length > 0 ? Math.round((totalApproved / records.length) * 100) : 0}%
                    </p>
                    <p className="mt-2 text-sm text-slate-500">Performance across all site cases</p>
                  </div>
                </div>

                {/* Batch Approve */}
                <div className="mt-6 rounded-3xl bg-slate-900 p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-bold">Ready for batch approval?</p>
                    <p className="mt-1 text-sm text-slate-300">Auto-approve all pending cases for {currentUser?.assigned_site}.</p>
                  </div>
                  <button
                    disabled={isProcessing}
                    onClick={handleBatchApprove}
                    className="cursor-pointer rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold hover:bg-emerald-400 transition disabled:opacity-50 whitespace-nowrap"
                  >
                    {isProcessing ? "Processing..." : "Approve All"}
                  </button>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Status Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: "Under Review", count: totalNew, dotColor: "bg-sky-500" },
                    { label: "Pending Review", count: totalPending, dotColor: "bg-amber-500" },
                    { label: "Missing Docs", count: totalMissing, dotColor: "bg-rose-500" },
                    { label: "Approved", count: totalApproved, dotColor: "bg-emerald-500" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${item.dotColor}`}></div>
                      <span className="flex-1 text-sm font-medium text-slate-600">{item.label}</span>
                      <span className="text-sm font-bold text-slate-800">{item.count}</span>
                    </div>
                  ))}
                </div>
                {records.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-400">Total Cases</span>
                    <span className="text-xl font-bold text-slate-800">{records.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ RECORDS / VERIFICATION TAB ══ */}
        {(activeTab === 'records' || activeTab === 'verification') && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    {activeTab === 'verification' ? 'Fulfillment Queue' : 'Active Registry'}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-800">
                    {activeTab === 'verification' ? 'Pending Documents' : 'Site Database'}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search patient name or ID..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-sky-500 w-full md:w-64"
                  />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500"
                  >
                    <option value="All">All Status</option>
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
                    <tr className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      <th className="pb-3 px-4">Patient</th>
                      <th className="pb-3 px-4">Tracking ID</th>
                      <th className="pb-3 px-4">Medical Condition</th>
                      <th className="pb-3 px-4">Status</th>
                      <th className="pb-3 px-4 text-right">Action</th>
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
                            <tr key={record.sys_id} className="group hover:bg-slate-50 transition">
                              <td className="py-4 px-4 text-sm font-semibold text-slate-800">
                                {record.patient_name}
                              </td>
                              <td className="py-4 px-4 text-sm text-slate-400">{record.number}</td>
                              <td className="py-4 px-4 text-sm text-slate-500">{record.medical_condition || "Intake Assessment"}</td>
                              <td className="py-4 px-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.cls}`}>
                                  {badge.label}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <button
                                  onClick={() => handleViewCase(record.sys_id)}
                                  className="cursor-pointer font-semibold text-sky-600 hover:text-sky-800 transition"
                                >
                                  View Case
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Case Detail Modal ── */}
      {selectedCase && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }} className="flex items-center justify-center p-6">
          <div style={{ width: '100%', maxWidth: '48rem', margin: '0 auto', maxHeight: '85vh' }} className="rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 flex flex-col overflow-hidden relative">

            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <p className="text-sm font-semibold text-sky-700">Case Detail</p>
                <h3 className="mt-1 text-xl font-bold text-slate-800">{selectedCase.number} — {selectedCase.patient_name}</h3>
              </div>
              <button onClick={() => { setSelectedCase(null); setUpdateNote(""); }} className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_240px]">

                {/* Left */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-sky-700 mb-3">Patient Information</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Full Name", value: selectedCase.patient_name },
                        { label: "Diagnosis", value: selectedCase.medical_condition },
                        { label: "Email", value: selectedCase.email },
                        { label: "Phone", value: selectedCase.phone_number },
                      ].map(field => (
                        <div key={field.label} className="rounded-2xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{field.label}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">{field.value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-sky-700 mb-3">Medical Abstract</p>
                    <div className="rounded-3xl bg-sky-50 p-5 ring-1 ring-sky-100">
                      <p className="text-sm text-slate-700 leading-7 italic">
                        "{selectedCase.medical_abstract || "No abstract provided."}"
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-sky-700 mb-3">Attached Documents</p>
                    <div className="flex items-center justify-between rounded-2xl ring-1 ring-slate-200 p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Consolidated Case File</p>
                        <p className="text-xs text-slate-400 mt-0.5">{selectedCase.document_url ? "File attached" : "No file uploaded"}</p>
                      </div>
                      {selectedCase.document_url && (
                        <a href={selectedCase.document_url} target="_blank" className="rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white">Open File</a>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-sky-700 mb-3">Staff Notes</p>
                    <textarea
                      value={updateNote}
                      onChange={e => setUpdateNote(e.target.value)}
                      placeholder="Add a note before updating status..."
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm outline-none focus:border-sky-500 h-24 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-3">Update Status</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleUpdateStatus("3")}
                        disabled={isUpdatingStatus}
                        className="cursor-pointer w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-50"
                      >
                        Approve Case
                      </button>
                      <button
                        onClick={() => handleUpdateStatus("4")}
                        disabled={isUpdatingStatus}
                        className="cursor-pointer w-full rounded-2xl border border-rose-200 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 transition disabled:opacity-50"
                      >
                        Missing Documents
                      </button>
                      <button
                        onClick={() => handleUpdateStatus("Referred")}
                        disabled={isUpdatingStatus}
                        className="cursor-pointer w-full rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition disabled:opacity-50"
                      >
                        Refer Case
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Current Status</p>
                    {(() => {
                      const b = getStatusBadge(selectedCase.state);
                      return <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${b.cls}`}>{b.label}</span>;
                    })()}
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Requested Amount</p>
                    <p className="mt-1 text-lg font-bold text-slate-800">₱{Number(selectedCase.requested_amount || 0).toLocaleString()}</p>
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
