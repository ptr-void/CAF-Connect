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

type NotificationsPageProps = {
  setActivePage: (page: PageKey) => void;
  currentUser?: any;
};

function NotificationsPage({ setActivePage, currentUser }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    fetch(`/api/x_1985733_cafsys/caf/notifications?email=${encodeURIComponent(currentUser.email)}`, {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then((r) => r.json())
      .then((data) => {
        const payload = data.result || data;
        setNotifications(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const filtered = notifications.filter(
    (n) =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Notifications Center</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Review all portal notifications, case updates, and reminders for your application.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("tracker")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              View Case Tracker
            </button>
            <button
              onClick={() => setActivePage("help")}
              className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Contact Support
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>
            {notifications.length > 0 && (
              <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 ring-1 ring-sky-100 whitespace-nowrap">
                {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-600" />
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 px-6 py-4 text-red-700 ring-1 ring-red-200">
            Error loading notifications: {error}
          </div>
        )}

        {!loading && !error && notifications.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-800">No notifications yet</h2>
            <p className="mt-3 text-slate-500">Notifications will appear here when your application is submitted or updated.</p>
            <button
              onClick={() => setActivePage("application")}
              className="mt-8 cursor-pointer rounded-2xl bg-sky-600 px-8 py-3 font-semibold text-white hover:bg-sky-700"
            >
              Submit an Application
            </button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.sys_id}
                className={`rounded-3xl border p-5 ${item.is_read ? "border-slate-200 bg-white" : "border-sky-200 bg-sky-50"}`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                      {!item.is_read && (
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.message}</p>
                    <p className="mt-3 text-xs text-slate-400">{item.created_date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && search && filtered.length === 0 && notifications.length > 0 && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500">No notifications match your search.</p>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-sky-700">Why notifications matter</p>
            <h3 className="mt-2 text-xl font-bold text-slate-800">Stay updated without confusion</h3>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Reminders for missing or corrected documents</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Updates when your case status changes</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Messages from the access site coordinator</div>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 ring-1 ring-sky-200">
            <p className="text-sm font-semibold text-slate-700">Need assistance?</p>
            <h3 className="mt-2 text-xl font-bold text-slate-800">Support can explain any update</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              If a message is unclear, contact the helpdesk or site coordinator for more guidance.
            </p>
            <button
              onClick={() => setActivePage("help")}
              className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
            >
              Open Help & Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
