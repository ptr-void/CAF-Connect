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

const accessSites = [
  {
    name: "Jose R. Reyes Memorial Medical Center",
    region: "National Capital Region",
    address: "Rizal Avenue, Sta. Cruz, Manila",
    contact: "(02) 8711-9491",
    services: "CAF guidance, intake support, document review",
    hours: "Monday to Friday • 8:00 AM - 5:00 PM",
  },
  {
    name: "East Avenue Medical Center",
    region: "National Capital Region",
    address: "East Avenue, Diliman, Quezon City",
    contact: "(02) 8928-0611",
    services: "Patient coordination, social service assistance",
    hours: "Monday to Friday • 8:00 AM - 5:00 PM",
  },
  {
    name: "Philippine General Hospital",
    region: "National Capital Region",
    address: "Taft Avenue, Ermita, Manila",
    contact: "(02) 8554-8400",
    services: "Hospital-based case support, referral coordination",
    hours: "Monday to Friday • 8:00 AM - 5:00 PM",
  },
  {
    name: "Bicol Medical Center",
    region: "Region V - Bicol",
    address: "Naga City, Camarines Sur",
    contact: "(054) 473-2181",
    services: "Regional intake support, site coordination",
    hours: "Monday to Friday • 8:00 AM - 5:00 PM",
  },
  {
    name: "Southern Philippines Medical Center",
    region: "Region XI - Davao Region",
    address: "JP Laurel Avenue, Davao City",
    contact: "(082) 227-2731",
    services: "Referral assistance, treatment-site coordination",
    hours: "Monday to Friday • 8:00 AM - 5:00 PM",
  },
  {
    name: "Vicente Sotto Memorial Medical Center",
    region: "Region VII - Central Visayas",
    address: "B. Rodriguez Street, Cebu City",
    contact: "(032) 253-9891",
    services: "CAF intake, patient navigation, file review",
    hours: "Monday to Friday • 8:00 AM - 5:00 PM",
  },
];

function AccessSitesPage({ setActivePage }: AccessSitesPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Access Sites Directory</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Find the correct DOH cancer access site, partner hospital, or social service office
              where the patient application can be coordinated and reviewed.
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

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Search Site</label>
                  <input
                    type="text"
                    placeholder="Hospital, office, or site"
                    className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Region</label>
                  <select className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500">
                    <option>All Regions</option>
                    <option>National Capital Region</option>
                    <option>Region V - Bicol</option>
                    <option>Region VII - Central Visayas</option>
                    <option>Region XI - Davao Region</option>
                  </select>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Service Type</label>
                  <select className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500">
                    <option>All Services</option>
                    <option>Intake Support</option>
                    <option>Document Review</option>
                    <option>Referral Coordination</option>
                    <option>Social Service Assistance</option>
                  </select>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Action</label>
                  <button className="cursor-pointer w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700">
                    Search Directory
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Directory Results</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    Available access sites and partner offices
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Search, filter, and review the site details before selecting one for the
                    patient application.
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 ring-1 ring-sky-100">
                  Showing 6 sample sites out of 34 access points
                </div>
              </div>

              <div className="mt-8 grid gap-5">
                {accessSites.map((site) => (
                  <div
                    key={site.name}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold text-slate-800">{site.name}</h3>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-slate-200">
                            {site.region}
                          </span>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          <div className="cursor-pointer rounded-2xl bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Address
                            </p>
                            <p className="mt-2 text-sm text-slate-700">{site.address}</p>
                          </div>

                          <div className="cursor-pointer rounded-2xl bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Contact
                            </p>
                            <p className="mt-2 text-sm text-slate-700">{site.contact}</p>
                          </div>

                          <div className="cursor-pointer rounded-2xl bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Services Available
                            </p>
                            <p className="mt-2 text-sm text-slate-700">{site.services}</p>
                          </div>

                          <div className="cursor-pointer rounded-2xl bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Office Hours
                            </p>
                            <p className="mt-2 text-sm text-slate-700">{site.hours}</p>
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
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Map Preview</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Location-based site view</h2>
              <p className="mt-2 text-sm text-slate-500">
                A map section may be used to help patients identify the nearest access site, hospital,
                or service office.
              </p>

              <div className="mt-6 rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 px-6 py-16 text-center ring-1 ring-sky-200">
                <div className="mx-auto max-w-xl">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-sky-700 shadow-sm">
                    📍
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-800">Interactive map placeholder</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    This area can display a map-based layout of the 34 access sites with filters,
                    pinned locations, and route guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-sky-700">How to choose a site</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Patient-friendly selection guidance
              </h3>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Choose the hospital or office nearest to the patient when possible
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Check the listed services before selecting a site
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Contact support if the correct location is unclear
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 ring-1 ring-sky-200">
              <p className="text-sm font-semibold text-slate-700">Need site help?</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                We can guide patients and families
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                The help center provides step-by-step support for selecting the correct access site,
                hospital office, or social service contact point.
              </p>

              <button
                onClick={() => setActivePage("help")}
                className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Open Help & Support
              </button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Quick Links</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("eligibility")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Eligibility Checker
                </button>
                <button
                  onClick={() => setActivePage("documents")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Document Requirements Guide
                </button>
                <button
                  onClick={() => setActivePage("tracker")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Application Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessSitesPage;


