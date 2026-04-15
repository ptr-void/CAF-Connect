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

const overviewCards = [
  {
    title: "Total Applications",
    value: "1,248",
    note: "System-wide submissions",
    bg: "bg-sky-50",
    text: "text-sky-700",
  },
  {
    title: "Active Access Sites",
    value: "34",
    note: "Configured service points",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    title: "Pending Cases",
    value: "142",
    note: "Awaiting staff action",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    title: "SMS Logs Today",
    value: "386",
    note: "Messages processed",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
];

const userRows = [
  {
    name: "Maria Santos",
    role: "Site Coordinator",
    site: "East Avenue Medical Center",
    status: "Active",
  },
  {
    name: "Paolo Reyes",
    role: "Administrator",
    site: "System-wide",
    status: "Active",
  },
  {
    name: "Lorna Bautista",
    role: "Social Service Staff",
    site: "Jose R. Reyes MMC",
    status: "Active",
  },
  {
    name: "Ana Cruz",
    role: "Site Coordinator",
    site: "Vicente Sotto Memorial Medical Center",
    status: "Inactive",
  },
];

const siteRows = [
  {
    name: "Jose R. Reyes Memorial Medical Center",
    region: "NCR",
    cases: "210",
    status: "Operational",
  },
  {
    name: "East Avenue Medical Center",
    region: "NCR",
    cases: "184",
    status: "Operational",
  },
  {
    name: "Vicente Sotto Memorial Medical Center",
    region: "Region VII",
    cases: "133",
    status: "Operational",
  },
  {
    name: "Bicol Medical Center",
    region: "Region V",
    cases: "97",
    status: "Monitoring",
  },
];

const analyticsRows = [
  {
    metric: "Average Case Turnaround",
    value: "4.2 days",
    note: "From submission to completed action",
  },
  {
    metric: "Most Active Site",
    value: "Jose R. Reyes MMC",
    note: "Highest recent intake volume",
  },
  {
    metric: "Pending Document Rate",
    value: "18%",
    note: "Applications needing follow-up files",
  },
  {
    metric: "SMS Delivery Success",
    value: "96%",
    note: "Latest processed notification batch",
  },
];

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
              <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-left font-semibold text-white">
                Overview
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                User Management
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Access Site Management
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                Reports & Analytics
              </button>
              <button className="w-full rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100">
                SMS Logs
              </button>
            </div>
          </nav>

          <div className="border-t border-slate-200 p-4">
            <button
              onClick={() => setActivePage("landing")}
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
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                >
                  Open Staff Dashboard
                </button>
                <button
                  onClick={() => setActivePage("notifications")}
                  className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  View Notifications
                </button>
              </div>
            </div>
          </header>

          <div className="space-y-6 p-6">
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
                      className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                    <select className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>All Roles</option>
                      <option>Administrator</option>
                      <option>Site Coordinator</option>
                      <option>Social Service Staff</option>
                    </select>
                    <button className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800">
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
                      {userRows.map((user) => (
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
                            <button className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-emerald-700">Application Volume by Site</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">Access site monitoring</h3>

                  <div className="mt-5 space-y-3">
                    {siteRows.map((site) => (
                      <div key={site.name} className="rounded-2xl bg-slate-50 px-4 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-800">{site.name}</p>
                            <p className="mt-1 text-sm text-slate-500">{site.region}</p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                              site.status
                            )}`}
                          >
                            {site.status}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">
                          Total active cases: <span className="font-semibold text-slate-800">{site.cases}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 ring-1 ring-sky-200">
                  <p className="text-sm font-semibold text-slate-700">System control</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-800">Admin actions</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    Update site availability, monitor case distribution, manage roles, and review
                    notification activity from one dashboard.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <button className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-800 hover:bg-slate-100">
                      Manage Access Sites
                    </button>
                    <button className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800">
                      Review SMS Logs
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-violet-700">Reports and Analytics</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-800">Key operational metrics</h3>

                <div className="mt-6 space-y-4">
                  {analyticsRows.map((item) => (
                    <div key={item.metric} className="rounded-2xl bg-slate-50 px-4 py-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-800">{item.metric}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.note}</p>
                        </div>
                        <p className="text-lg font-bold text-violet-700">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-amber-700">SMS Logs / Notification Monitoring</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-800">Recent message activity</h3>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Latest batch
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      122 reminders sent for missing documents across 8 access sites.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Delivery summary
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      96% delivered, 3% queued, 1% failed and pending retry.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Most common alert
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      Missing prescription and medical abstract follow-up reminders.
                    </p>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-2xl bg-amber-500 px-4 py-3 font-semibold text-white hover:bg-amber-600">
                  Open Full SMS Logs
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
