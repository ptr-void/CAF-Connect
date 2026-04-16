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

type AccessSitesPageProps = {
  setActivePage: (page: PageKey) => void;
};

type Site = {
  sys_id: string;
  site_name: string;
  region: string;
  address: string;
  contact_number: string;
  operating_hours: string;
  remaining_funds?: number;
  status?: string;
  supported_cancers?: string;
};

function AccessSitesPage({ setActivePage }: AccessSitesPageProps) {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");

  useEffect(() => {
    fetch("/api/x_1985733_cafsys/caf/sites", {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then((r) => r.json())
      .then((data) => {
        const payload = data.result || data;
        setSites(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const regions = ["All Regions", ...Array.from(new Set(sites.map((s) => s.region).filter(Boolean)))];

  const filtered = sites.filter((s) => {
    const matchSearch =
      !search ||
      s.site_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.address?.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "All Regions" || s.region === regionFilter;
    return matchSearch && matchRegion;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Access Sites Directory</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Find the correct DOH cancer access site or partner hospital where your application can be coordinated and reviewed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Go to Application
            </button>
            <button
              onClick={() => setActivePage("help")}
              className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Need Help Choosing?
            </button>
          </div>
        </div>

        {}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Search Site</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Hospital, office, or site name..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Region</label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500"
              >
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-600" />
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 px-6 py-4 text-red-700 ring-1 ring-red-200">
            Error loading sites: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">Showing {filtered.length} of {sites.length} access sites</p>
            </div>

            <div className="grid gap-5">
              {filtered.map((site) => (
                <div key={site.sys_id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-slate-800">{site.site_name}</h3>
                        {site.region && (
                          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
                            {site.region}
                          </span>
                        )}
                        {site.status && (
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${site.status === 'Available' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : site.status === 'Exhausted' ? 'bg-red-50 text-red-700 ring-red-200' : 'bg-amber-50 text-amber-700 ring-amber-200'}`}>
                            {site.status}
                          </span>
                        )}
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {site.address && (
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</p>
                            <p className="mt-2 text-sm text-slate-700">{site.address}</p>
                          </div>
                        )}
                        {site.contact_number && (
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contact</p>
                            <p className="mt-2 text-sm text-slate-700">{site.contact_number}</p>
                          </div>
                        )}
                        {site.operating_hours && (
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Office Hours</p>
                            <p className="mt-2 text-sm text-slate-700">{site.operating_hours}</p>
                          </div>
                        )}
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Remaining Funds</p>
                          <p className="mt-2 text-sm font-bold text-slate-800">
                            {site.remaining_funds ? `₱${Number(site.remaining_funds).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "₱0.00"}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 md:col-span-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Priority Supported Cancers</p>
                          <p className="mt-2 text-sm text-slate-700">{site.supported_cancers || "All Major Cancers"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 lg:w-52">
                      <button
                        onClick={() => setActivePage("application")}
                        className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700"
                      >
                        Apply / Select Site
                      </button>
                      <button
                        onClick={() => setActivePage("help")}
                        className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                <p className="text-slate-500">No sites match your search. Try a different keyword or region.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AccessSitesPage;
