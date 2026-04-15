import { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/x_1985733_cafsys/caf/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-no-response-body": "false",
          "X-UserToken": (window as any).g_ck || "",
        },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      const payload = data.result || data; // Handle ServiceNow 'result' wrapper
      
      if (res.ok && payload.user_name) {
        const userData = { name: payload.name, email: payload.email, user_name: payload.user_name };
        if (setCurrentUser) setCurrentUser(userData);
        if (setIsAuthenticated) setIsAuthenticated(true);
        localStorage.setItem("caf_portal_user", JSON.stringify(userData));
        setActivePage("tracker");
      } else {
        let errorMsg = "Login failed. Please try again.";
        if (typeof data.error === "string") {
          errorMsg = data.error;
        } else if (data.error && data.error.message) {
          errorMsg = data.error.message;
        } else if (data.message) {
          errorMsg = data.message;
        } else {
          // Fallback to show exactly what the server responded with so we can debug it
          errorMsg = `Login failed. Server replied: ${JSON.stringify(data)}`;
        }
        setError(`Error: ${errorMsg}`);
      }
    } catch (err: any) {
      setError(`Network error: ${err.message || "Please check your connection."}`);
    } finally {
      setLoading(false);
    }
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
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  {error && (
                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                      {error}
                    </div>
                  )}

                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
                    Guardians may also sign in to help patients complete the application process.
                  </div>

                  <button
                    type="button"
                    onClick={handleSignIn}
                    disabled={loading}
                    className={`cursor-pointer w-full rounded-2xl px-5 py-3 font-semibold text-white transition ${loading ? "bg-slate-400" : "bg-emerald-600 hover:bg-emerald-700"}`}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => setActivePage("eligibility")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700">Check Eligibility</button>
                    <button type="button" onClick={() => setActivePage("tracker")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700">Track Application</button>
                  </div>
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
                <button onClick={() => setActivePage("help")} className="cursor-pointer mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Open Help &amp; Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
