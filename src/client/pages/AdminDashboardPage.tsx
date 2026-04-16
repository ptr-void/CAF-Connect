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

function getStatusStyle(status: string) {
  const s = status || "";
  if (s.includes("Active") || s.includes("Operational")) {
    return "bg-emerald-100 text-emerald-700";
  }
  if (s.includes("Inactive")) {
    return "bg-rose-100 text-rose-700";
  }
  if (s.includes("Monitoring")) {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-slate-100 text-slate-700";
}

function AdminDashboardPage({ setActivePage }: AdminDashboardPageProps) {
  const [stats, setStats] = useState({ totalApps: 0, activeSites: 0, pendingCases: 0, pendingDocRate: 0 });
  const [userRows, setUserRows] = useState<any[]>([]);
  const [siteRows, setSiteRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Modal States
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUserInfo, setNewUserInfo] = useState({ name: '', email: '', role: 'Site Coordinator', site: '' });
  const [isAdding, setIsAdding] = useState(false);

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    fetch("/api/x_1985733_cafsys/caf/admin/add_user", {
        method: 'POST',
        headers: { 
            "X-UserToken": (window as any).g_ck || "",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: newUserInfo })
    })
    .then(res => res.json())
    .then(() => {
        alert("User added successfully!");
        setShowAddUser(false);
        fetchDashboardData();
    })
    .catch(err => alert("Error: " + err.message))
    .finally(() => setIsAdding(false));
  };

  const overviewCards = [
    {
      title: "Total Applications",
      value: loading ? "..." : stats.totalApps.toString(),
      note: "System-wide submissions",
      bg: "bg-sky-50",
      text: "text-sky-700",
    },
    {
      title: "Active Access Sites",
      value: loading ? "..." : stats.activeSites.toString(),
      note: "Configured service points",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      title: "Pending Cases",
      value: loading ? "..." : stats.pendingCases.toString(),
      note: "Awaiting staff action",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
    {
      title: "Pending Doc Rate",
      value: loading ? "..." : (stats.pendingDocRate || 0) + "%",
      note: "Applicants needing files",
      bg: "bg-rose-50",
      text: "text-rose-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white xl:flex sticky top-0 h-screen">
          <div className="border-b border-slate-200 px-6 py-8">
            <h1 className="text-xl font-black tracking-tight text-slate-800">ADMIN CONTROL</h1>
            <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">Portal Analytics</p>
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
                onClick={() => setActiveTab("users")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-bold transition flex items-center gap-3 ${activeTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                <div className={`w-2 h-2 rounded-full ${activeTab === 'users' ? 'bg-sky-400' : 'bg-slate-300'}`}></div>
                User Management
              </button>
              <button 
                onClick={() => setActiveTab("sites")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-bold transition flex items-center gap-3 ${activeTab === 'sites' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                <div className={`w-2 h-2 rounded-full ${activeTab === 'sites' ? 'bg-sky-400' : 'bg-slate-300'}`}></div>
                Access Sites
              </button>
            </div>
          </nav>

          <div className="p-4">
            <button
              onClick={() => setActivePage("landing")}
              className="cursor-pointer w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 font-bold text-slate-600 hover:border-sky-500 hover:text-sky-700 transition"
            >
              Exit Dashboard
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <header className="bg-white px-8 py-8 border-b border-slate-200">
             <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Oversight</h2>
                  <p className="mt-2 text-slate-500 font-medium">Real-time statistics and infrastructure control.</p>
                </div>
                <div className="flex items-center gap-3">
                   <button 
                      onClick={() => setActivePage("staff")} 
                      className="cursor-pointer rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 hover:border-sky-500 transition"
                   >
                     Staff View
                   </button>
                   <button 
                      onClick={() => setShowAddUser(true)}
                      className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700 shadow-lg shadow-sky-200 transition"
                   >
                     + New Account
                   </button>
                </div>
             </div>
          </header>

          <div className="p-8 space-y-8">
            {activeTab === 'overview' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {overviewCards.map((card) => (
                    <div key={card.title} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 group-hover:scale-110 transition ${card.bg.replace('bg-', 'bg-')}`}></div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{card.title}</p>
                      <p className={`mt-4 text-5xl font-black tracking-tight ${card.text}`}>{card.value}</p>
                      <p className="mt-2 text-xs font-bold text-slate-400">{card.note}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
                   <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-6 mb-6">
                        <h3 className="text-2xl font-black text-slate-900">Key Performance</h3>
                        <div className="px-4 py-1.5 bg-sky-50 rounded-full text-xs font-bold text-sky-700">Live Sync</div>
                      </div>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group cursor-pointer hover:bg-sky-50 transition">
                           <div className="font-bold text-slate-800">Missing Document Rate</div>
                           <div className="text-2xl font-black text-sky-600">{(stats.pendingDocRate || 0)}%</div>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group cursor-pointer hover:bg-emerald-50 transition">
                           <div className="font-bold text-slate-800">Operational Access Sites</div>
                           <div className="text-2xl font-black text-emerald-600">{stats.activeSites}</div>
                        </div>
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-500/20 to-transparent"></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-black">Portal Notice</h3>
                        <p className="mt-4 text-slate-400 font-medium leading-relaxed">
                          The system core is fully connected to the ServiceNow backend. All statistics, user roles, and site configurations are retrieved in real-time.
                        </p>
                        <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/10">
                           <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">System Status</p>
                           <p className="mt-2 text-sm font-bold text-slate-100">Database Synchronization: <span className="text-emerald-400">Stable</span></p>
                        </div>
                        <button onClick={() => setActiveTab('users')} className="mt-8 w-full py-4 bg-sky-500 rounded-2xl font-black text-sm hover:bg-sky-400 transition">
                           Review Registered Staff
                        </button>
                      </div>
                   </div>
                </div>
              </>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900">User Directory</h3>
                      <p className="mt-1 text-slate-500 font-medium uppercase text-xs tracking-widest">Portal staff and access coordinators</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <input 
                         type="text" 
                         placeholder="Filter names..." 
                         className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-sky-500 transition"
                      />
                      <button onClick={() => setShowAddUser(true)} className="px-6 py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition">
                        Add New
                      </button>
                   </div>
                </div>

                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                          <th className="pb-4 px-4">Account Holder</th>
                          <th className="pb-4 px-4">Role Designation</th>
                          <th className="pb-4 px-4">Site Assignment</th>
                          <th className="pb-4 px-4">Management</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {loading ? (
                           <tr><td colSpan={4} className="py-20 text-center text-slate-400 font-bold italic underline decoration-sky-300">Synchronizing records...</td></tr>
                        ) : userRows.map(user => (
                           <tr key={user.name + user.role} className="group hover:bg-slate-50 transition">
                              <td className="py-6 px-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg">
                                      {user.name.charAt(0)}
                                   </div>
                                   <div className="font-black text-slate-800">{user.name}</div>
                                </div>
                              </td>
                              <td className="py-6 px-4 font-bold text-slate-500 text-sm whitespace-nowrap">{user.role}</td>
                              <td className="py-6 px-4">
                                 <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase">
                                    {user.site}
                                 </span>
                              </td>
                              <td className="py-6 px-4">
                                 <button 
                                    onClick={() => setSelectedUser(user)}
                                    className="cursor-pointer px-4 py-2 opacity-0 group-hover:opacity-100  bg-white border-2 border-slate-200 rounded-xl font-bold text-xs hover:border-sky-500 hover:text-sky-700 transition"
                                 >
                                   View Details
                                 </button>
                              </td>
                           </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </div>
            )}

            {activeTab === 'sites' && (
               <div className="grid gap-6 lg:grid-cols-2">
                  {siteRows.map(site => (
                     <div key={site.name} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex items-center justify-between group hover:border-sky-500 transition">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{site.region}</p>
                           <h4 className="mt-1 text-2xl font-black text-slate-800 tracking-tight">{site.name}</h4>
                           <p className="mt-4 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span className="text-sm font-bold text-slate-500">{site.cases} active applications</span>
                           </p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                           <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-tight ${getStatusStyle(site.status)}`}>
                             {site.status}
                           </span>
                           <button className="cursor-pointer text-xs font-black text-sky-600 underline">Configure Site</button>
                        </div>
                     </div>
                  ))}
               </div>
            )}
          </div>
        </main>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
              <div className="bg-slate-900 p-8 text-white">
                 <h3 className="text-2xl font-black">Register New System Account</h3>
                 <p className="mt-1 text-slate-400 font-medium">Create a new site coordinator or admin login.</p>
              </div>
              <form onSubmit={handleAddUser} className="p-8 space-y-5">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      required
                      value={newUserInfo.name}
                      onChange={e => setNewUserInfo({...newUserInfo, name: e.target.value})}
                      type="text" 
                      className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-sky-500" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      required
                      value={newUserInfo.email}
                      onChange={e => setNewUserInfo({...newUserInfo, email: e.target.value})}
                      type="email" 
                      className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-sky-500" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</label>
                        <select 
                          value={newUserInfo.role}
                          onChange={e => setNewUserInfo({...newUserInfo, role: e.target.value})}
                          className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-sky-500"
                        >
                           <option>Site Coordinator</option>
                           <option>Administrator</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Site</label>
                        <select 
                          value={newUserInfo.site}
                          onChange={e => setNewUserInfo({...newUserInfo, site: e.target.value})}
                          className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-sky-500"
                        >
                           <option value="">System-wide</option>
                           {siteRows.map(s => <option key={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                 </div>
                 <div className="flex gap-3 mt-8">
                    <button 
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="cursor-pointer flex-1 py-4 font-black text-slate-400 hover:text-slate-600 transition"
                    >
                      Cancel
                    </button>
                    <button 
                      disabled={isAdding}
                      type="submit"
                      className="cursor-pointer flex-[2] py-4 bg-sky-600 text-white font-black rounded-2xl hover:bg-sky-700 shadow-lg shadow-sky-200"
                    >
                      {isAdding ? "Registering..." : "Create Account"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative">
              <button 
                 onClick={() => setSelectedUser(null)}
                 className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition"
              >
                 ✕
              </button>
              <div className="p-10">
                 <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-50">
                    <div className="w-20 h-20 rounded-[2rem] bg-sky-600 text-white flex items-center justify-center text-4xl font-black">
                       {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-slate-900">{selectedUser.name}</h3>
                       <p className="text-sky-600 font-bold">{selectedUser.role}</p>
                    </div>
                 </div>

                 <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Email</p>
                       <p className="font-bold text-slate-700">{selectedUser.email || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Assignment</p>
                       <p className="font-bold text-slate-700">{selectedUser.site}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Status</p>
                       <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">
                          {selectedUser.status}
                       </span>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</p>
                       <p className="font-bold text-slate-500 italic">Connected Live</p>
                    </div>
                 </div>

                 <div className="mt-10 flex gap-4">
                    <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition">
                       Update Permissions
                    </button>
                    <button className="flex-1 py-4 border-2 border-rose-100 text-rose-500 rounded-2xl font-black text-sm hover:bg-rose-50 transition">
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
