type PageKey =
  | "landing"
  | "auth"
  | "eligibility"
  | "documents"
  | "application"
  | "tracker"
  | "sites"
  | "notifications"
  | "help"
  | "staff"
  | "admin";

type AuthPageProps = {
  setActivePage: (page: PageKey) => void;
};

function AuthPage({ setActivePage }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              onClick={() => setActivePage("landing")}
              className="text-sm font-medium text-sky-700 hover:text-sky-800"
            >
              ← Back to Home
            </button>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Patient Registration / Login</h1>
            <p className="mt-2 text-slate-600">
              Secure and easy access for patients, guardians, and family-assisted applications.
            </p>
          </div>

          <button
            onClick={() => setActivePage("help")}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
          >
            Need Help?
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-lg font-bold text-white">
                  1
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-800">Create an account</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Register as a patient or family representative to begin eligibility checking and
                  application submission.
                </p>
              </div>

              <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">
                  2
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-800">Secure login</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Access saved drafts, uploaded documents, case updates, and site coordination
                  details anytime.
                </p>
              </div>

              <div className="rounded-3xl bg-violet-50 p-6 ring-1 ring-violet-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white">
                  3
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-800">Continue application</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Resume the intake process, upload missing documents, and monitor case status with
                  ease.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-sky-700">New Patient / Guardian</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Create Account</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Fill in the patient or guardian account details to start the process.
                </p>

                <form className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="09XXXXXXXXX"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      placeholder="Create password"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Account Type</label>
                    <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500">
                      <option>Patient</option>
                      <option>Family Member / Guardian</option>
                    </select>
                  </div>

                  <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
                    Please use an active mobile number to receive SMS reminders and case updates.
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
                  >
                    Create Account
                  </button>
                </form>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-emerald-700">Existing Account</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Sign In</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Log in to continue a saved application or check your current case status.
                </p>

                <form className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-sky-700 hover:text-sky-800"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
                    Guardians may also sign in to help patients complete the application process.
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Sign In
                  </button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setActivePage("eligibility")}
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                    >
                      Check Eligibility
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePage("tracker")}
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                    >
                      Track Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-sky-700">Why register?</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-800">A guided and secure patient portal</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Save incomplete applications as draft</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Review missing and uploaded documents</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Receive case updates through SMS and portal alerts</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Choose and manage the correct access site</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 ring-1 ring-sky-200">
              <p className="text-sm font-semibold text-slate-700">Account assistance</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Having trouble signing in?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Patients and guardians who need help with registration, password reset, or account
                recovery may contact the support team or visit the help center for guidance.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700">
                  Hotline Support: Available during office hours
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700">
                  SMS Assistance: Receive reminders and follow-up notifications
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700">
                  Guardian Access: Family-assisted account setup available
                </div>
              </div>

              <button
                onClick={() => setActivePage("help")}
                className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Open Help & Support
              </button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-violet-700">Quick access</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("application")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Patient Intake / Application Form
                </button>
                <button
                  onClick={() => setActivePage("documents")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Document Requirements Guide
                </button>
                <button
                  onClick={() => setActivePage("notifications")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Notifications Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;