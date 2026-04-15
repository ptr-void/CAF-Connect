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

type LandingPageProps = {
  setActivePage: (page: PageKey) => void;
};

const accessSites = [
  "Jose R. Reyes Memorial Medical Center",
  "East Avenue Medical Center",
  "Philippine General Hospital",
  "Bicol Medical Center",
  "Southern Philippines Medical Center",
  "Vicente Sotto Memorial Medical Center",
];

const processSteps = [
  {
    title: "Check Eligibility",
    description:
      "Answer a few guided questions to see whether the patient may qualify for Cancer Assistance Fund support.",
  },
  {
    title: "Prepare Documents",
    description:
      "Review the required documents with simple notes, status indicators, and upload guidance.",
  },
  {
    title: "Submit Application",
    description:
      "Complete the patient intake form, choose the correct access site, and send the request online.",
  },
  {
    title: "Track the Case",
    description:
      "Monitor progress, receive updates, and stay informed through status tracking and SMS reminders.",
  },
];

function LandingPage({ setActivePage }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">

      <main>
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
                Government healthcare support made easier
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-800 md:text-5xl">
                Help patients access the <span className="text-sky-700">Cancer Assistance Fund</span>{" "}
                with clarity and confidence
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                CAF Access Navigator helps patients, families, and coordinators check eligibility,
                prepare documents, submit requests, track case progress, and find the right cancer
                access site quickly.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setActivePage("eligibility")}
                  className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
                >
                  Check Eligibility
                </button>
                <button
                  onClick={() => setActivePage("application")}
                  className="cursor-pointer rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => setActivePage("tracker")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
                >
                  Track Application
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-3xl font-bold text-sky-700">34</p>
                  <p className="mt-2 text-sm text-slate-500">Access sites supported nationwide</p>
                </div>
                <div className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-3xl font-bold text-emerald-700">SMS</p>
                  <p className="mt-2 text-sm text-slate-500">Updates and reminders for patients</p>
                </div>
                <div className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-3xl font-bold text-violet-700">Easy</p>
                  <p className="mt-2 text-sm text-slate-500">Guided steps for first-time users</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
              <div className="rounded-3xl bg-sky-50 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-sky-700">Patient Quick Overview</p>
                    <h3 className="mt-1 text-2xl font-bold text-slate-800">Start your CAF journey</h3>
                  </div>
                  <div className="cursor-pointer rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                    Compassionate support
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700">Eligibility status</p>
                    <p className="mt-2 text-lg font-bold text-emerald-600">Ready for pre-screening</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Complete the step-by-step checker to know your next steps.
                    </p>
                  </div>

                  <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700">Required documents</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                        <span className="text-sm text-slate-600">Medical abstract</span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Missing
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                        <span className="text-sm text-slate-600">Valid ID</span>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Uploaded
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700">Case tracker preview</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <div className="h-1 flex-1 rounded-full bg-emerald-500" />
                      <div className="h-3 w-3 rounded-full bg-sky-500" />
                      <div className="h-1 flex-1 rounded-full bg-slate-200" />
                      <div className="h-3 w-3 rounded-full bg-slate-300" />
                      <div className="h-1 flex-1 rounded-full bg-slate-200" />
                      <div className="h-3 w-3 rounded-full bg-slate-300" />
                    </div>
                    <p className="mt-3 text-sm text-slate-500">
                      Submitted → Under Review → Pending Documents → Verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              How it works
            </p>
            <h3 className="mt-3 text-3xl font-bold text-slate-800">
              A simple step-by-step process for patients and families
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              The platform is designed to reduce confusion and guide users from eligibility checking
              to application submission and case tracking.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-lg font-bold text-sky-700">
                  {index + 1}
                </div>
                <h4 className="mt-5 text-xl font-semibold text-slate-800">{step.title}</h4>
                <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Access Sites Directory</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    Find the correct support office or hospital site
                  </h3>
                  <p className="mt-3 max-w-2xl text-slate-600">
                    Browse available access sites, hospitals, and service offices where CAF-related
                    assistance can be coordinated.
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("sites")}
                  className="cursor-pointer rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  View All Sites
                </button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {accessSites.map((site) => (
                  <div
                    key={site}
                    className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                  >
                    <p className="text-lg font-semibold text-slate-800">{site}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Cancer access support, document guidance, and patient referral assistance.
                    </p>
                    <button
                      onClick={() => setActivePage("sites")}
                      className="cursor-pointer mt-4 text-sm font-semibold text-sky-700 hover:text-sky-800"
                    >
                      Select this site →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-100 to-sky-100 p-8 shadow-sm ring-1 ring-emerald-200">
              <p className="text-sm font-semibold text-emerald-800">Need help?</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-800">
                Support is available for every step
              </h3>
              <p className="mt-4 leading-7 text-slate-700">
                Get document guidance, hotline details, SMS support information, and answers to
                common questions from the help center.
              </p>

              <div className="mt-8 space-y-4">
                <div className="cursor-pointer rounded-2xl bg-white/80 p-4">
                  <p className="font-semibold text-slate-800">Frequently Asked Questions</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Quick answers for first-time applicants and guardians.
                  </p>
                </div>

                <div className="cursor-pointer rounded-2xl bg-white/80 p-4">
                  <p className="font-semibold text-slate-800">SMS Assistance</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Receive reminders for missing documents and status updates.
                  </p>
                </div>

                <div className="cursor-pointer rounded-2xl bg-white/80 p-4">
                  <p className="font-semibold text-slate-800">Office Contact Directory</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Reach out to coordinators, social service offices, and access sites.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActivePage("help")}
                className="cursor-pointer mt-8 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Open Help &amp; Support
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 text-white">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                  Ready to begin?
                </p>
                <h3 className="mt-3 text-3xl font-bold">
                  Start with a guided eligibility check or submit a patient application today
                </h3>
                <p className="mt-4 max-w-3xl text-slate-300">
                  CAF Access Navigator is built to make the process clearer, faster, and easier for
                  patients, families, and healthcare coordinators.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActivePage("eligibility")}
                  className="cursor-pointer rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600"
                >
                  Check Eligibility
                </button>
                <button
                  onClick={() => setActivePage("login")}
                  className="cursor-pointer rounded-2xl border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  Sign In / Register
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-4">
          <div>
            <h4 className="text-lg font-bold text-sky-700">CAF Access Navigator</h4>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              A healthcare service platform for patient intake, document guidance, case tracking,
              and access site coordination.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-800">Quick Links</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <button onClick={() => setActivePage("eligibility")} className="cursor-pointer block hover:text-sky-700">
                Eligibility Checker
              </button>
              <button onClick={() => setActivePage("application")} className="cursor-pointer block hover:text-sky-700">
                Patient Application
              </button>
              <button onClick={() => setActivePage("tracker")} className="cursor-pointer block hover:text-sky-700">
                Application Tracker
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-800">Support</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <p>Hotline Support</p>
              <p>SMS Notification Assistance</p>
              <p>Site Coordinator Helpdesk</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-800">System Access</p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setActivePage("staff")}
                className="cursor-pointer block text-sm text-slate-500 hover:text-sky-700"
              >
                Staff Dashboard
              </button>
              <button
                onClick={() => setActivePage("admin")}
                className="cursor-pointer block text-sm text-slate-500 hover:text-sky-700"
              >
                Admin Dashboard
              </button>
              <button
                onClick={() => setActivePage("notifications")}
                className="cursor-pointer block text-sm text-slate-500 hover:text-sky-700"
              >
                Notifications Center
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;



