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

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "sites", label: "Sites", icon: "🏥" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <div className="flex min-h-screen">

        {/* ── Sidebar ── */}
        <aside className="hidden w-64 flex-col bg-slate-900 xl:flex sticky top-0 h-screen">
          <div className="px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center">
                <span className="text-white text-sm font-black">A</span>
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-tight">Admin Panel</h1>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Control Center</p>
              </div>
            </div>
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
                {activeTab === tab.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400"></div>}
              </button>
            ))}
          </nav>

          <div className="p-3 space-y-2">
            <button
              onClick={() => setActivePage("staff")}
              className="cursor-pointer w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-400 hover:text-slate-200 hover:bg-white/5 transition"
            >
              <span className="text-base">📋</span> Staff View
            </button>
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
                  {activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'users' ? 'User Management' : 'Access Sites'}
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Real-time system analytics</p>
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="cursor-pointer rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-700 shadow-sm transition"
              >
                + New Account
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-8">

            {/* ══ OVERVIEW TAB ══ */}
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Stat Cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Total Applications", value: stats.totalApps, color: "sky", icon: "📄" },
                    { label: "Active Sites", value: stats.activeSites, color: "emerald", icon: "🏥" },
                    { label: "Pending Cases", value: stats.pendingCases, color: "amber", icon: "⏳" },
                    { label: "Missing Doc Rate", value: `${stats.pendingDocRate || 0}%`, color: "rose", icon: "📎" },
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

                {/* Two-column layout */}
                <div className="grid gap-6 xl:grid-cols-5">

                  {/* Performance Panel */}
                  <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-800">Key Metrics</h3>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">Live</span>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-sky-50 transition">
                        <span className="text-sm font-semibold text-slate-700">Missing Document Rate</span>
                        <span className="text-lg font-black text-sky-600">{stats.pendingDocRate || 0}%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition">
                        <span className="text-sm font-semibold text-slate-700">Operational Sites</span>
                        <span className="text-lg font-black text-emerald-600">{stats.activeSites}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-amber-50 transition">
                        <span className="text-sm font-semibold text-slate-700">Cases Awaiting Review</span>
                        <span className="text-lg font-black text-amber-600">{stats.pendingCases}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-violet-50 transition">
                        <span className="text-sm font-semibold text-slate-700">Registered Staff</span>
                        <span className="text-lg font-black text-violet-600">{userRows.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Portal Notice */}
                  <div className="xl:col-span-2 bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-sky-400">System Notice</h3>
                      <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                        All portal statistics, user roles, and site configurations are synced live from the ServiceNow backend.
                      </p>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Database Status</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">● Synchronized</p>
                      </div>
                      <button onClick={() => setActiveTab('users')} className="cursor-pointer w-full py-3 bg-sky-500 rounded-xl font-bold text-sm hover:bg-sky-400 transition">
                        Review Staff Accounts →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══ USERS TAB ══ */}
            {activeTab === 'users' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={userFilter}
                    onChange={e => setUserFilter(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition w-full sm:w-72"
                  />
                  <button onClick={() => setShowAddUser(true)} className="cursor-pointer px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition whitespace-nowrap">
                    + Add User
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        <th className="py-3 px-5">Name</th>
                        <th className="py-3 px-5">Email</th>
                        <th className="py-3 px-5">Role</th>
                        <th className="py-3 px-5">Site</th>
                        <th className="py-3 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {loading ? (
                        <tr><td colSpan={5} className="py-16 text-center text-sm text-slate-400 italic">Loading users...</td></tr>
                      ) : filteredUsers.length === 0 ? (
                        <tr><td colSpan={5} className="py-16 text-center text-sm text-slate-400 italic">No users found.</td></tr>
                      ) : filteredUsers.map((user, i) => (
                        <tr key={user.name + i} className="group hover:bg-sky-50/30 transition">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-black text-sm shrink-0">
                                {user.name?.charAt(0) || "?"}
                              </div>
                              <span className="font-bold text-sm text-slate-800">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-sm text-slate-500">{user.email || "—"}</td>
                          <td className="py-3.5 px-5">
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                              user.role === 'Administrator' ? 'bg-violet-100 text-violet-700' : 'bg-sky-100 text-sky-700'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-sm text-slate-500">{user.site}</td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="cursor-pointer px-3 py-1.5 text-xs font-bold text-sky-600 bg-sky-50 rounded-lg hover:bg-sky-100 transition opacity-0 group-hover:opacity-100"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ══ SITES TAB ══ */}
            {activeTab === 'sites' && (
              <div className="space-y-5">
                {loading ? (
                  <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
                    <p className="text-sm text-slate-400 italic">Loading access sites...</p>
                  </div>
                ) : siteRows.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
                    <p className="text-4xl mb-3">🏥</p>
                    <h3 className="text-lg font-bold text-slate-700">No Sites Configured</h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                      Access sites will appear here once they are registered in your ServiceNow instance under <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">x_1985733_cafsys_site</code>.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {siteRows.map((site, i) => (
                      <div key={site.name + i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-sky-200 hover:shadow-md transition">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{site.region}</p>
                            <h4 className="text-base font-black text-slate-800 mt-1 truncate">{site.name}</h4>
                          </div>
                          <span className={`shrink-0 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                            site.status === 'Operational' ? 'bg-emerald-100 text-emerald-700'
                              : site.status === 'Inactive' ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {site.status}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-xs font-semibold text-slate-500">{site.cases} active case{site.cases !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Add User Modal ── */}
      {showAddUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-5 text-white">
              <h3 className="text-lg font-black">Create Staff Account</h3>
              <p className="text-xs text-slate-400 mt-0.5">New coordinator or administrator login</p>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <input required value={newUserInfo.name} onChange={e => setNewUserInfo({...newUserInfo, name: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <input required value={newUserInfo.email} onChange={e => setNewUserInfo({...newUserInfo, email: e.target.value})} type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Role</label>
                  <select value={newUserInfo.role} onChange={e => setNewUserInfo({...newUserInfo, role: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400">
                    <option>Site Coordinator</option>
                    <option>Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Site</label>
                  <select value={newUserInfo.site} onChange={e => setNewUserInfo({...newUserInfo, site: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400">
                    <option value="">System-wide</option>
                    {siteRows.map(s => <option key={s.name}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddUser(false)} className="cursor-pointer flex-1 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition">Cancel</button>
                <button disabled={isAdding} type="submit" className="cursor-pointer flex-[2] py-2.5 bg-sky-600 text-white text-sm font-bold rounded-xl hover:bg-sky-700 transition disabled:opacity-50">
                  {isAdding ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── User Detail Modal ── */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg">
                  {selectedUser.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedUser.name}</h3>
                  <span className={`text-[10px] font-bold uppercase ${selectedUser.role === 'Administrator' ? 'text-violet-600' : 'text-sky-600'}`}>
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition text-sm">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1 truncate">{selectedUser.email || "Not set"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Site</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1 truncate">{selectedUser.site}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                  <p className="text-sm font-semibold text-emerald-600 mt-1">● Active</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Access</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">Full Portal</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button className="cursor-pointer flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition">
                Edit Permissions
              </button>
              <button className="cursor-pointer flex-1 py-2.5 border border-rose-200 text-rose-500 rounded-xl text-sm font-bold hover:bg-rose-50 transition">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;
