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
  if (status === "Active" || status === "Operational") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Inactive") {
    return "bg-rose-100 text-rose-700";
  }

  if (status === "Monitoring") {
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

  useEffect(() => {
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
  }, []);

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
      value: loading ? "..." : stats.pendingDocRate + "%",
      note: "Applicants needing files",
      bg: "bg-rose-50",
      text: "text-rose-700",
    },
  ];

  const analyticsRows = [
    {
      metric: "Average Case Turnaround",
      value: "N/A",
      note: "From submission to completed action",
    },
    {
      metric: "Most Active Site",
      value: siteRows.length > 0 ? [...siteRows].sort((a,b)=>b.cases - a.cases)[0]?.name || "N/A" : "N/A",
      note: "Highest recent intake volume",
    },
    {
      metric: "Pending Document Rate",
      value: stats.pendingDocRate + "%",
      note: "Applications needing follow-up files",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white xl:flex">
          <div className="border-b border-slate-200 px-6 py-6">
            <h1 className="text-2xl font-bold text-sky-700">CAF Access Navigator</h1>
            <p className="mt-1 text-sm text-slate-500">Admin Dashboard</p>
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold transition ${activeTab === 'overview' ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                Overview
              </button>
              <button 
                onClick={() => setActiveTab("users")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold transition ${activeTab === 'users' ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                User Management
              </button>
              <button 
                onClick={() => setActiveTab("sites")}
                className={`cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-semibold transition ${activeTab === 'sites' ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                Access Site Management
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
                <h2 className="mt-2 text-3xl font-bold text-slate-800">Admin Dashboard</h2>
                <p className="mt-1 text-slate-500">
                  Manage users, access sites, reports, and system-wide monitoring.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActivePage("staff")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                >
                  Open Staff Dashboard
                </button>
                <button
                  onClick={() => setActivePage("notifications")}
                  className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  View Notifications
                </button>
              </div>
            </div>
          </header>

          <div className="space-y-6 p-6">
            {activeTab === 'overview' && (
              <>
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {overviewCards.map((card) => (
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

                <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-sky-700">Quick Portal Analytics</p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-800">
                          System Performance
                        </h3>
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      {analyticsRows.map((row) => (
                        <div key={row.metric} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                          <div>
                            <p className="font-semibold text-slate-800">{row.metric}</p>
                            <p className="text-xs text-slate-500">{row.note}</p>
                          </div>
                          <p className="text-xl font-bold text-sky-700">{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-sky-700 p-8 text-white shadow-lg">
                    <h3 className="text-2xl font-bold">Admin Notice</h3>
                    <p className="mt-4 text-sky-100 leading-relaxed">
                      All system statistics are now fetched in real-time. SMS notification integration has been disabled per system requirements. 
                      User and site management can be accessed via the sidebar.
                    </p>
                    <button onClick={() => setActiveTab("users")} className="mt-6 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-sky-700 shadow-md">
                      Manage Users
                    </button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'users' && (
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-sky-700">User and Role Management</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-800">
                      Staff and coordinator accounts
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Manage access roles and monitor which users are assigned to each site.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <input
                      type="text"
                      placeholder="Search user"
                      className="cursor-pointer rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                    <select className="cursor-pointer rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>All Roles</option>
                      <option>Administrator</option>
                      <option>Site Coordinator</option>
                      <option>Social Service Staff</option>
                    </select>
                    <button className="cursor-pointer rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800">
                      Add User
                    </button>
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-sm text-slate-500">
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Role</th>
                        <th className="px-4 py-3 font-semibold">Assigned Site</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading users...</td></tr>
                      ) : userRows.length === 0 ? (
                        <tr><td colSpan={5} className="py-8 text-center text-slate-500">No staff found.</td></tr>
                      ) : userRows.map((user) => (
                        <tr key={user.name} className="border-b border-slate-100">
                          <td className="px-4 py-4 font-semibold text-slate-800">{user.name}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{user.role}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{user.site}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                user.status
                              )}`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <button className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                              Manage
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
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                   <div>
                    <p className="text-sm font-semibold text-sky-700">Access Site Management</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-800">Service points and funding</h3>
                    <p className="mt-2 text-sm text-slate-500">Monitor active treatment facilities and their case volumes.</p>
                  </div>
                </div>
                
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  {siteRows.map(site => (
                    <div key={site.name} className="flex items-center justify-between rounded-2xl border border-slate-100 p-6">
                      <div>
                        <h4 className="font-bold text-slate-800">{site.name}</h4>
                        <p className="text-sm text-slate-500">{site.region}</p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-sky-600">{site.cases} Active Cases</p>
                      </div>
                      <span className={`rounded-xl px-4 py-1.5 text-xs font-bold uppercase ${getStatusStyle(site.status)}`}>
                        {site.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
