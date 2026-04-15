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
};

const notificationItems = [
  {
    title: "Missing document reminder",
    message:
      "Please upload the corrected doctorâ€™s prescription so your application can continue to the next review step.",
    type: "Reminder",
    channel: "SMS + In-System",
    time: "Apr 12, 2026 â€?10:05 AM",
    status: "Delivered",
  },
  {
    title: "Application received",
    message:
      "Your CAF application has been submitted successfully and is now waiting for site coordinator review.",
    type: "Case Update",
    channel: "In-System",
    time: "Apr 10, 2026 â€?9:20 AM",
    status: "Read",
  },
  {
    title: "Initial review started",
    message:
      "A site coordinator has started reviewing the patient details and uploaded requirements.",
    type: "Case Update",
    channel: "SMS + In-System",
    time: "Apr 11, 2026 â€?1:40 PM",
    status: "Delivered",
  },
  {
    title: "Site follow-up notice",
    message:
      "Please keep your mobile number active for additional instructions from the assigned access site.",
    type: "Follow-Up",
    channel: "SMS",
    time: "Apr 12, 2026 â€?3:15 PM",
    status: "Queued",
  },
];

function getBadgeClasses(type: string) {
  if (type === "Reminder") {
    return "bg-amber-100 text-amber-700";
  }

  if (type === "Case Update") {
    return "bg-sky-100 text-sky-700";
  }

  if (type === "Follow-Up") {
    return "bg-violet-100 text-violet-700";
  }

  return "bg-slate-100 text-slate-700";
}

function getStatusClasses(status: string) {
  if (status === "Delivered") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Read") {
    return "bg-sky-100 text-sky-700";
  }

  if (status === "Queued") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
}

function NotificationsPage({ setActivePage }: NotificationsPageProps) {
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
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Notifications Center</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Review SMS and in-system notifications, including reminders for missing documents,
              case progress updates, and important follow-up messages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="cursor-pointer" onClick={() => setActivePage("tracker")}
              className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              View Case Tracker
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
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Search</label>
                  <input
                    type="text"
                    placeholder="Search notifications"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Type</label>
                  <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500">
                    <option>All Types</option>
                    <option>Reminder</option>
                    <option>Case Update</option>
                    <option>Follow-Up</option>
                  </select>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Channel</label>
                  <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500">
                    <option>All Channels</option>
                    <option>SMS</option>
                    <option>In-System</option>
                    <option>SMS + In-System</option>
                  </select>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Action</label>
                  <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700">
                    Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-8 lg:p-10 shadow-sm border border-white/60 shadow-lg">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Notification Feed</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    Updates and reminders for the patient case
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Keep track of everything sent through the portal and SMS notification service.
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 ring-1 ring-sky-100">
                  4 recent notifications
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {notificationItems.map((item) => (
                  <div
                    key={`${item.title}-${item.time}`}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses(
                              item.type
                            )}`}
                          >
                            {item.type}
                          </span>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-white/60 shadow-lg">
                            {item.channel}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-600">{item.message}</p>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                          >
                            Mark as Read
                          </button>
                          <button
                            type="button"
                            className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-3 md:items-end">
                        <span className="text-xs font-medium text-slate-500">{item.time}</span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
                <p className="text-sm font-semibold text-emerald-700">SMS Settings Preview</p>
                <h3 className="mt-2 text-xl font-bold text-slate-800">Current notification setup</h3>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    SMS updates: Enabled
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    Registered number: 09XXXXXXXXX
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    Reminder type: Missing documents and case progress
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
                <p className="text-sm font-semibold text-violet-700">Reminder Summary</p>
                <h3 className="mt-2 text-xl font-bold text-slate-800">Pending patient action</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  There is currently one pending reminder related to a corrected prescription file.
                  Once uploaded, the application can move forward in the review process.
                </p>

                <button className="cursor-pointer" onClick={() => setActivePage("documents")}
                  className="mt-5 rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Go to Document Upload
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-sky-700">Why this matters</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Stay updated without confusion</h3>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Receive reminders for missing or corrected documents
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Get notified when your case status changes
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Review messages in one patient-friendly dashboard
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-slate-700">Need assistance?</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Support can explain any update
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                If a message is unclear, patients and guardians may ask the helpdesk or site
                coordinator for more guidance.
              </p>

              <button className="cursor-pointer" onClick={() => setActivePage("help")}
                className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Open Help & Support
              </button>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-emerald-700">Quick Links</p>
              <div className="mt-4 grid gap-3">
                <button className="cursor-pointer" onClick={() => setActivePage("tracker")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Case Status Tracker
                </button>
                <button className="cursor-pointer" onClick={() => setActivePage("application")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Patient Application Form
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

export default NotificationsPage;
