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

type TrackerPageProps = {
  setActivePage: (page: PageKey) => void;
};

const timelineSteps = [
  { label: "Submitted", status: "completed", date: "Apr 10, 2026" },
  { label: "Under Review", status: "completed", date: "Apr 11, 2026" },
  { label: "Pending Documents", status: "active", date: "Apr 12, 2026" },
  { label: "Verified", status: "upcoming", date: "Waiting" },
  { label: "Approved", status: "upcoming", date: "Waiting" },
  { label: "Released / Completed", status: "upcoming", date: "Waiting" },
];

const recentUpdates = [
  {
    title: "Application received",
    description: "Your intake form was submitted successfully and forwarded to the selected access site.",
    time: "Apr 10, 2026 â€?9:20 AM",
  },
  {
    title: "Initial review started",
    description: "A coordinator has started reviewing the patient details and uploaded requirements.",
    time: "Apr 11, 2026 â€?1:40 PM",
  },
  {
    title: "Additional document requested",
    description: "Please upload a corrected doctorâ€™s prescription to continue the review process.",
    time: "Apr 12, 2026 â€?10:05 AM",
  },
];

const smsItems = [
  {
    label: "Latest SMS Sent",
    value: "Reminder: Please upload corrected prescription",
  },
  {
    label: "Delivery Status",
    value: "Delivered successfully",
  },
  {
    label: "Preferred Contact",
    value: "SMS updates enabled",
  },
];

function getStepClasses(status: string) {
  if (status === "completed") {
    return "bg-emerald-600 text-white border-emerald-600";
  }

  if (status === "active") {
    return "bg-sky-600 text-white border-sky-600";
  }

  return "bg-white text-slate-500 border-slate-300";
}

function getLineClasses(status: string) {
  if (status === "completed") {
    return "bg-emerald-500";
  }

  if (status === "active") {
    return "bg-sky-300";
  }

  return "bg-slate-200";
}

function TrackerPage({ setActivePage }: TrackerPageProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-sky-50/50 to-emerald-50/50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button className="cursor-pointer" onClick={() => setActivePage("landing")}
              className="text-sm font-medium text-sky-700 hover:text-sky-800"
            >
              â†?Back to Home
            </button>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Application Tracker / Case Status</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Follow the current status of the patient request, review recent updates, and monitor
              SMS notifications related to the case.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="cursor-pointer" onClick={() => setActivePage("documents")}
              className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              View Documents
            </button>
            <button className="cursor-pointer" onClick={() => setActivePage("help")}
              className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Contact Support
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-8 lg:p-10 shadow-sm border border-white/60 shadow-lg">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Case Overview</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">CAF Case Status Timeline</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Current application status: <span className="font-semibold text-sky-700">Pending Documents</span>
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
                  Action needed: Upload corrected prescription
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <div className="flex min-w-[900px] items-start">
                  {timelineSteps.map((step, index) => (
                    <div key={step.label} className="flex flex-1 items-start">
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold ${getStepClasses(
                            step.status
                          )}`}
                        >
                          {index + 1}
                        </div>
                        <p className="mt-3 w-28 text-sm font-semibold text-slate-700">{step.label}</p>
                        <p className="mt-1 text-xs text-slate-500">{step.date}</p>
                      </div>

                      {index !== timelineSteps.length - 1 && (
                        <div
                          className={`mt-6 h-1 flex-1 rounded-full ${getLineClasses(
                            step.status
                          )}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-8 lg:p-10 shadow-sm border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-emerald-700">Recent Updates Log</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Latest case activity</h2>

              <div className="mt-6 space-y-4">
                {recentUpdates.map((item) => (
                  <div key={item.title} className="rounded-3xl bg-slate-50 p-5 border border-white/60 shadow-lg">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 border border-white/60 shadow-lg">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
                <p className="text-sm font-semibold text-violet-700">Assigned Site</p>
                <h3 className="mt-2 text-xl font-bold text-slate-800">Jose R. Reyes Memorial Medical Center</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The selected access site is currently reviewing the submitted patient information
                  and waiting for corrected supporting documents.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    Address: Manila, Philippines
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    Office Hours: Monday to Friday
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    Contact: Site Coordinator / Social Service Desk
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
                <p className="text-sm font-semibold text-amber-700">Pending Requirement</p>
                <h3 className="mt-2 text-xl font-bold text-slate-800">Doctorâ€™s Prescription</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The uploaded prescription needs correction because the signature or date is not
                  clear enough for verification.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="cursor-pointer" onClick={() => setActivePage("documents")}
                    className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    Upload Corrected File
                  </button>
                  <button className="cursor-pointer" onClick={() => setActivePage("notifications")}
                    className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                  >
                    View Notification
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-sky-700">SMS Notification Status</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Message delivery panel</h3>

              <div className="mt-5 space-y-3">
                {smsItems.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>

              <button className="cursor-pointer" onClick={() => setActivePage("notifications")}
                className="mt-6 w-full rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
              >
                Open Notifications Center
              </button>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-slate-700">Need follow-up?</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Support is available</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Patients and guardians may contact the support desk for questions about missing
                documents, access site assignment, or case movement.
              </p>

              <button className="cursor-pointer" onClick={() => setActivePage("help")}
                className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Go to Help & Support
              </button>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-emerald-700">Quick Links</p>
              <div className="mt-4 grid gap-3">
                <button className="cursor-pointer" onClick={() => setActivePage("application")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Patient Application Form
                </button>
                <button className="cursor-pointer" onClick={() => setActivePage("sites")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Access Sites Directory
                </button>
                <button className="cursor-pointer" onClick={() => setActivePage("auth")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Patient Portal Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackerPage;
