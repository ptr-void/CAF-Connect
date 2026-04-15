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

type LoginPageProps = {
  setActivePage: (page: PageKey) => void;
};

function LoginPage({ setActivePage }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-sky-700">CAF Access Navigator</h1>
            <p className="text-sm text-slate-500">
              Cancer Assistance Fund guidance, intake, and tracking platform
            </p>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <button onClick={() => setActivePage("landing")} className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-sky-700">Home</button>
            <button onClick={() => setActivePage("eligibility")} className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-sky-700">Eligibility</button>
            <button onClick={() => setActivePage("application")} className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-sky-700">Apply</button>
            <button onClick={() => setActivePage("tracker")} className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-sky-700">Track</button>
            <button onClick={() => setActivePage("sites")} className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-sky-700">Access Sites</button>
            <button onClick={() => setActivePage("help")} className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-sky-700">Help</button>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setActivePage("login")} className="cursor-pointer rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Sign In</button>
            <button onClick={() => setActivePage("register")} className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-700">Register</button>
          </div>
        </div>
      </header>

      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="mt-3 text-3xl font-bold text-slate-800">Patient Login</h2>
            <p className="mt-2 text-slate-600">
              Secure and easy access for patients, guardians, and family-assisted applications.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-lg font-bold text-white">1</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-800">Sign in</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Access saved drafts, uploaded documents, case updates, and site coordination details anytime.</p>
                </div>
                <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">2</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-800">Review your case</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Check document status, pending items, and site coordinator messages for your application.</p>
                </div>
                <div className="rounded-3xl bg-violet-50 p-6 ring-1 ring-violet-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white">3</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-800">Continue application</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Resume the intake process, upload missing documents, and monitor case status with ease.</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-emerald-700">Existing Account</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Sign In</h2>
                <p className="mt-2 text-sm text-slate-500">Log in to continue a saved application or check your current case status.</p>

                <form className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                    <input type="email" placeholder="Enter your email" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                    <input type="password" placeholder="Enter your password" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                      Remember me
                    </label>
                    <button type="button" className="cursor-pointer text-sm font-medium text-sky-700 hover:text-sky-800">Forgot Password?</button>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
                    Guardians may also sign in to help patients complete the application process.
                  </div>

                  <button type="button" className="cursor-pointer w-full rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">Sign In</button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => setActivePage("eligibility")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700">Check Eligibility</button>
                    <button type="button" onClick={() => setActivePage("tracker")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700">Track Application</button>
                  </div>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                  Don't have an account?{" "}
                  <button onClick={() => setActivePage("register")} className="cursor-pointer font-semibold text-sky-700 hover:text-sky-800">Create one here</button>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-sky-700">Why sign in?</p>
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
                <p className="mt-3 text-sm leading-6 text-slate-700">Patients and guardians who need help with registration, password reset, or account recovery may contact the support team or visit the help center.</p>
                <button onClick={() => setActivePage("help")} className="cursor-pointer mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Open Help &amp; Support</button>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-violet-700">Quick access</p>
                <div className="mt-4 grid gap-3">
                  <button onClick={() => setActivePage("application")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700">Patient Intake / Application Form</button>
                  <button onClick={() => setActivePage("documents")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700">Document Requirements Guide</button>
                  <button onClick={() => setActivePage("notifications")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700">Notifications Center</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
