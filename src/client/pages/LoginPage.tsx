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

type LoginPageProps = {
  setActivePage: (page: PageKey) => void;
  setIsAuthenticated?: (auth: boolean) => void;
  setCurrentUser?: (user: { name: string; email: string; user_name: string } | null) => void;
};

function LoginPage({ setActivePage, setIsAuthenticated, setCurrentUser }: LoginPageProps) {
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const gUser = (window as any).g_user;
    if (gUser && gUser.userID && gUser.userID !== '') {
      if (setCurrentUser) setCurrentUser({
        name: (gUser.firstName || '') + ' ' + (gUser.lastName || ''),
        email: gUser.email || '',
        user_name: gUser.userName || '',
      });
      if (setIsAuthenticated) setIsAuthenticated(true);
      setActivePage('tracker');
    }
    setChecking(false);
  }, []);

  const handleSignIn = () => {
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `/login.do?redirectTo=${returnUrl}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
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

                <div className="mt-6 space-y-4">
                  {checking ? (
                    <div className="flex items-center justify-center gap-3 py-6">
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
                      <span className="text-sm text-slate-500">Checking session...</span>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-800 ring-1 ring-sky-200">
                        You will be redirected to the secure ServiceNow login page to sign in with your registered credentials.
                      </div>

                      <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
                        Guardians may also sign in to help patients complete the application process.
                      </div>

                      <button
                        type="button"
                        onClick={handleSignIn}
                        className="cursor-pointer w-full rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Sign In with ServiceNow
                      </button>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <button type="button" onClick={() => setActivePage("eligibility")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700">Check Eligibility</button>
                      </div>
                    </>
                  )}
                </div>

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
                <button onClick={() => setActivePage("help")} className="cursor-pointer mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Open Help & Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
