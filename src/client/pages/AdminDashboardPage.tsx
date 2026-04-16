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

type AdminDashboardPageProps = {
  setActivePage: (page: PageKey) => void;
};

function AdminDashboardPage({ setActivePage }: AdminDashboardPageProps) {
  const [stats, setStats] = useState({ totalApps: 0, activeSites: 0, pendingCases: 0, pendingDocRate: 0 });
  const [userRows, setUserRows] = useState<any[]>([]);
  const [siteRows, setSiteRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUserInfo, setNewUserInfo] = useState({ name: '', email: '', role: 'Site Coordinator', site: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [userFilter, setUserFilter] = useState("");

  const fetchDashboardData = () => {
    setLoading(true);
    fetch("/api/x_1985733_cafsys/caf/admin/dashboard", {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then(res => res.json())
      .then(data => {
        const payload = data.result || data;
        if (payload) {
          setStats(payload.stats || { totalApps: 0, activeSites: 0, pendingCases: 0, pendingDocRate: 0 });
          setUserRows(payload.users || []);
          setSiteRows(payload.sites || []);
        }
      })
      .catch(err => console.error("Error fetching admin dashboard:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    fetch("/api/x_1985733_cafsys/caf/admin/add_user", {
      method: 'POST',
      headers: { "X-UserToken": (window as any).g_ck || "", "Content-Type": "application/json" },
      body: JSON.stringify({ data: newUserInfo })
    })
      .then(res => res.json())
      .then(() => { alert("User added successfully!"); setShowAddUser(false); setNewUserInfo({ name: '', email: '', role: 'Site Coordinator', site: '' }); fetchDashboardData(); })
      .catch(err => alert("Error: " + err.message))
      .finally(() => setIsAdding(false));
  };

  const filteredUsers = userRows.filter(u =>
    !userFilter || u.name?.toLowerCase().includes(userFilter.toLowerCase()) || u.email?.toLowerCase().includes(userFilter.toLowerCase())
  );

  const tabItems = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "User Management" },
    { id: "sites", label: "Access Sites" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-sky-700">Administrator Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-800">System Oversight</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Real-time portal analytics, user management, and site configuration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("staff")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Staff View
            </button>
            <button
              onClick={() => setShowAddUser(true)}
              className="cursor-pointer rounded-2xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              + New Account
            </button>
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
                  ? "bg-sky-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-sky-300 hover:text-sky-700"
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
                { title: "Total Applications", value: loading ? "..." : stats.totalApps, sub: "System-wide submissions", color: "text-sky-700" },
                { title: "Active Access Sites", value: loading ? "..." : stats.activeSites, sub: "Configured service points", color: "text-emerald-700" },
                { title: "Pending Cases", value: loading ? "..." : stats.pendingCases, sub: "Awaiting staff action", color: "text-amber-700" },
                { title: "Missing Doc Rate", value: loading ? "..." : `${stats.pendingDocRate || 0}%`, sub: "Applicants needing files", color: "text-rose-700" },
              ].map(card => (
                <div key={card.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-500">{card.title}</p>
                  <p className={`mt-3 text-3xl font-bold ${card.color}`}>{card.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{card.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
              {/* Key Metrics */}
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">Key Performance</h3>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Live Sync</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Missing Document Rate", value: `${stats.pendingDocRate || 0}%`, color: "text-sky-700" },
                    { label: "Operational Access Sites", value: stats.activeSites.toString(), color: "text-emerald-700" },
                    { label: "Cases Awaiting Review", value: stats.pendingCases.toString(), color: "text-amber-700" },
                    { label: "Registered Staff", value: userRows.length.toString(), color: "text-violet-700" },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
                      <span className="text-sm font-medium text-slate-700">{row.label}</span>
                      <span className={`text-xl font-bold ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portal Notice */}
              <div className="rounded-3xl bg-slate-900 p-8 text-white">
                <p className="text-sm font-semibold text-sky-400">System Notice</p>
                <h3 className="mt-2 text-xl font-bold">Portal Status</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  All statistics, user roles, and site configurations are synced live from the ServiceNow backend.
                </p>
                <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold text-slate-400">Database Status</p>
                  <p className="mt-1 text-sm font-bold text-emerald-400">Synchronized</p>
                </div>
                <button onClick={() => setActiveTab('users')} className="cursor-pointer mt-6 w-full rounded-2xl bg-sky-500 py-3 text-sm font-semibold hover:bg-sky-400 transition">
                  Review Registered Staff
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ USERS TAB ══ */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Portal Access</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-800">User Directory</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    placeholder="Filter by name or email..."
                    value={userFilter}
                    onChange={e => setUserFilter(e.target.value)}
                    className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-sky-500 w-full md:w-64"
                  />
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="cursor-pointer rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Add New
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      <th className="pb-3 px-4">Account Holder</th>
                      <th className="pb-3 px-4">Email</th>
                      <th className="pb-3 px-4">Role</th>
                      <th className="pb-3 px-4">Site Assignment</th>
                      <th className="pb-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan={5} className="py-16 text-center text-sm text-slate-400 italic">Loading user records...</td></tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr><td colSpan={5} className="py-16 text-center text-sm text-slate-400 italic">No users found.</td></tr>
                    ) : filteredUsers.map((user, i) => (
                      <tr key={user.name + i} className="group hover:bg-slate-50 transition">
                        <td className="py-4 px-4 text-sm font-semibold text-slate-800">
                          {user.name}
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-500">{user.email || "—"}</td>
                        <td className="py-4 px-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === 'Administrator' ? 'bg-violet-100 text-violet-700' : 'bg-sky-100 text-sky-700'
                          }`}>{user.role}</span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-500">{user.site}</td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="cursor-pointer font-semibold text-sky-600 hover:text-sky-800 transition"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ SITES TAB ══ */}
        {activeTab === 'sites' && (
          <div className="space-y-6">
            {loading ? (
              <div className="rounded-3xl bg-white p-16 shadow-sm ring-1 ring-slate-200 text-center">
                <p className="text-sm text-slate-400 italic">Loading access sites...</p>
              </div>
            ) : siteRows.length === 0 ? (
              <div className="rounded-3xl bg-white p-16 shadow-sm ring-1 ring-slate-200 text-center">
                <p className="text-sm font-semibold text-sky-700">No Sites Registered</p>
                <h3 className="mt-2 text-xl font-bold text-slate-800">Access Sites Directory is Empty</h3>
                <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
                  Sites will appear here once they are configured in your ServiceNow instance under the <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">x_1985733_cafsys_site</code> table.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {siteRows.map((site, i) => (
                  <div key={site.name + i} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-sky-300 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{site.region}</p>
                        <h4 className="mt-1 text-lg font-bold text-slate-800 truncate">{site.name}</h4>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        site.status === 'Operational' ? 'bg-emerald-100 text-emerald-700'
                          : site.status === 'Inactive' ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>{site.status}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-slate-500">{site.cases} active application{Number(site.cases) !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Add User Modal ── */}
      {showAddUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }} className="flex items-center justify-center p-6">
          <div style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }} className="rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden relative">

            <div className="bg-gradient-to-br from-sky-50 to-emerald-50 px-8 py-6">
              <p className="text-sm font-semibold text-sky-700">Account Registration</p>
              <h3 className="mt-1 text-xl font-bold text-slate-800">Create a new system account</h3>
              <p className="mt-2 text-sm text-slate-600">New site coordinator or administrator login.</p>
            </div>
            <form onSubmit={handleAddUser} className="p-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                <input required value={newUserInfo.name} onChange={e => setNewUserInfo({...newUserInfo, name: e.target.value})} type="text" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                <input required value={newUserInfo.email} onChange={e => setNewUserInfo({...newUserInfo, email: e.target.value})} type="email" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                  <select value={newUserInfo.role} onChange={e => setNewUserInfo({...newUserInfo, role: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                    <option>Site Coordinator</option>
                    <option>Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Access Site</label>
                  <select value={newUserInfo.site} onChange={e => setNewUserInfo({...newUserInfo, site: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                    <option value="">System-wide</option>
                    {siteRows.map(s => <option key={s.name}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddUser(false)} className="cursor-pointer flex-1 rounded-2xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 hover:border-slate-400">
                  Cancel
                </button>
                <button disabled={isAdding} type="submit" className="cursor-pointer flex-[2] rounded-2xl bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50">
                  {isAdding ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── User Detail Modal ── */}
      {selectedUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }} className="flex items-center justify-center p-6">
          <div style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }} className="rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden relative">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-lg font-bold text-sky-700">
                  {selectedUser.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{selectedUser.name}</h3>
                  <span className={`text-xs font-semibold ${selectedUser.role === 'Administrator' ? 'text-violet-600' : 'text-sky-600'}`}>
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700 truncate">{selectedUser.email || "Not configured"}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Site Assignment</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700 truncate">{selectedUser.site}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-600">{selectedUser.status}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Access Level</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">Full Portal</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="cursor-pointer flex-1 rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
                  Update Permissions
                </button>
                <button className="cursor-pointer flex-1 rounded-2xl border border-rose-200 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 transition">
                  Deactivate User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;
