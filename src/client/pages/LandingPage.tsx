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
    description: "Answer a few guided questions to see whether the patient may qualify for Cancer Assistance Fund support.",
  },
  {
    title: "Prepare Documents",
    description: "Review the required documents with simple notes, status indicators, and upload guidance.",
  },
  {
    title: "Submit Application",
    description: "Complete the patient intake form, choose the correct access site, and send the request online.",
  },
  {
    title: "Track the Case",
    description: "Monitor progress, receive updates, and stay informed through status tracking and SMS reminders.",
  },
];

function LandingPage({ setActivePage }: LandingPageProps) {
  return (
    <div className="w-full bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center xl:py-24">
          <div>
            <span className="inline-flex cursor-default items-center rounded-full border border-sky-200 bg-sky-100/50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 backdrop-blur-sm">
              Government healthcare support made easier
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Access the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">Cancer Assistance Fund</span> with clarity
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              CAF Access Navigator helps patients, families, and coordinators check eligibility,
              prepare documents, submit requests, track case progress, and find the right cancer
              access site quickly.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => setActivePage("eligibility")}
                className="cursor-pointer rounded-full bg-gradient-to-r from-sky-600 to-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-sky-500"
              >
                Check Eligibility
              </button>
              <button
                onClick={() => setActivePage("application")}
                className="cursor-pointer rounded-full bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
              >
                Apply Now
              </button>
              <button
                onClick={() => setActivePage("tracker")}
                className="cursor-pointer rounded-full border border-slate-300 bg-white/80 px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-slate-50 hover:text-sky-700 hover:ring-2 hover:ring-slate-200/50"
              >
                Track Application
              </button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-transform hover:scale-[1.02]">
                <p className="text-3xl font-black text-sky-700">34</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Supported Sites</p>
              </div>
              <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-transform hover:scale-[1.02]">
                <p className="text-3xl font-black text-emerald-700">SMS</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Live Updates</p>
              </div>
              <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-transform hover:scale-[1.02]">
                <p className="text-3xl font-black text-violet-700">100%</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Guided Process</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] border border-white/50 bg-white/40 p-2 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[2rem] bg-gradient-to-b from-sky-50 to-white p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-700">Patient Quick Overview</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-800">Start your CAF journey</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Active Support
                </div>
              </div>

              <div className="space-y-4">
                <div className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:scale-[1.02] hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-700">Eligibility status</p>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">Pre-screened</span>
                  </div>
                  <p className="mt-2 text-lg font-black text-emerald-600">Ready for review</p>
                  <p className="mt-1 text-sm text-slate-500">Complete the step-by-step checker to know your next steps.</p>
                </div>

                <div className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:scale-[1.02] hover:shadow-md">
                  <p className="text-sm font-bold text-slate-700">Required documents</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50/80 px-4 py-3 border border-slate-100">
                      <span className="text-sm font-medium text-slate-700">Medical abstract</span>
                      <span className="rounded-full bg-amber-100/80 px-3 py-1 text-[10px] font-black uppercase text-amber-700">Missing</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50/80 px-4 py-3 border border-slate-100">
                      <span className="text-sm font-medium text-slate-700">Valid ID</span>
                      <span className="rounded-full bg-emerald-100/80 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">Uploaded</span>
                    </div>
                  </div>
                </div>

                <div className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:scale-[1.02] hover:shadow-md">
                  <p className="text-sm font-bold text-slate-700">Case tracker preview</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                    <div className="h-1 flex-1 rounded-full bg-emerald-500" />
                    <div className="h-3 w-3 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
                    <div className="h-1 flex-1 rounded-full bg-slate-200" />
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-1 flex-1 rounded-full bg-slate-200" />
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Submitted <span className="mx-1 text-slate-300">&rarr;</span> <span className="text-sky-600">Under Review</span> <span className="mx-1 text-slate-300">&rarr;</span> Pending <span className="mx-1 text-slate-300">&rarr;</span> Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="text-sm font-black uppercase tracking-widest text-sky-600">How it works</p>
          <h3 className="mt-3 text-3xl font-extrabold text-slate-800 sm:text-4xl">
            A simple step-by-step process
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            The platform is designed to reduce confusion and guide users from eligibility checking to application submission and case tracking.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="group cursor-pointer rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-sky-500/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-xl font-black text-sky-600 shadow-sm transition-colors group-hover:bg-sky-500 group-hover:text-white">
                {index + 1}
              </div>
              <h4 className="mt-6 text-xl font-bold text-slate-800 transition-colors group-hover:text-sky-700">{step.title}</h4>
              <p className="mt-3 leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100/50 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2.5rem] border border-slate-200/60 bg-white p-10 shadow-xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-emerald-600">Access Sites Directory</p>
                <h3 className="mt-3 text-3xl font-extrabold text-slate-800">
                  Find your nearest support office
                </h3>
                <p className="mt-4 max-w-xl text-lg text-slate-600">
                  Browse available access sites, hospitals, and service offices where CAF-related assistance can be coordinated.
                </p>
              </div>

              <button
                onClick={() => setActivePage("sites")}
                className="cursor-pointer whitespace-nowrap rounded-full bg-slate-900 px-6 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
              >
                View All Sites
              </button>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {accessSites.slice(0,4).map((site) => (
                <div
                  key={site}
                  className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-md hover:ring-1 hover:ring-slate-300"
                >
                  <p className="text-lg font-bold text-slate-800 transition-colors group-hover:text-sky-700">{site}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Cancer access support and patient referral assistance.
                  </p>
                  <button
                    onClick={() => setActivePage("sites")}
                    className="mt-5 flex cursor-pointer items-center text-sm font-bold text-sky-600 transition-colors hover:text-sky-800"
                  >
                    Select this site <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-sky-200/60 bg-gradient-to-br from-emerald-100 to-sky-100 p-10 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
             </div>
            <div className="relative z-10">
              <p className="text-sm font-black uppercase tracking-widest text-emerald-800">Support Center</p>
              <h3 className="mt-3 text-3xl font-extrabold text-slate-800 lg:text-4xl">
                Always here to help you out
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">
                Get document guidance, hotline details, SMS support information, and answers to common questions.
              </p>

              <div className="mt-10 space-y-4">
                <div className="cursor-pointer rounded-2xl bg-white/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md">
                  <p className="font-bold text-slate-800">Frequently Asked Questions</p>
                  <p className="mt-1 text-sm text-slate-600">Quick answers for first-time applicants.</p>
                </div>

                <div className="cursor-pointer rounded-2xl bg-white/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md">
                  <p className="font-bold text-slate-800">SMS Assistance</p>
                  <p className="mt-1 text-sm text-slate-600">Receive reminders for missing documents.</p>
                </div>
              </div>

              <button
                onClick={() => setActivePage("help")}
                className="mt-10 w-full cursor-pointer rounded-full bg-white px-6 py-4 font-bold text-slate-800 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-100"
              >
                Open Help & Support Center
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-16 shadow-2xl lg:px-16 lg:py-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-sky-400">Ready to begin?</p>
              <h3 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Start your application today
              </h3>
              <p className="mt-5 max-w-2xl text-xl text-slate-300">
                CAF Access Navigator is built to make the process clearer, faster, and easier for patients, families, and healthcare coordinators.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActivePage("eligibility")}
                className="cursor-pointer rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-sky-500/25"
              >
                Check Eligibility
              </button>
              <button
                onClick={() => setActivePage("register")}
                className="cursor-pointer rounded-full border-2 border-slate-700 bg-slate-800/50 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-700"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
