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

type RegisterPageProps = {
  setActivePage: (page: PageKey) => void;
  setIsAuthenticated?: (auth: boolean) => void;
  setCurrentUser?: (user: { name: string; email: string; user_name: string } | null) => void;
};

function RegisterPage({ setActivePage, setIsAuthenticated, setCurrentUser }: RegisterPageProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    if (!fullName || !email || !password) {
      setError("Full name, email, and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/x_1985733_cafsys/caf/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          mobile,
          password,
          account_type: accountType,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        if (setCurrentUser) setCurrentUser({ name: fullName, email, user_name: data.user_name });
        if (setIsAuthenticated) setIsAuthenticated(true);
        setActivePage("tracker");
      } else {
        const errorMsg = typeof data.error === "string"
          ? data.error
          : data.message || data.detail || "Registration failed. Please try again.";
        setError(errorMsg);
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="mt-3 text-3xl font-bold text-slate-800">Create an Account</h2>
            <p className="mt-2 text-slate-600">
              Register as a patient or family representative to begin eligibility checking and application submission.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-lg font-bold text-white">1</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-800">Create account</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Register as a patient or family representative to begin eligibility checking and application submission.</p>
                </div>
                <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">2</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-800">Verify details</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Confirm your mobile number and email to activate SMS case updates and portal notifications.</p>
                </div>
                <div className="rounded-3xl bg-violet-50 p-6 ring-1 ring-violet-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white">3</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-800">Start application</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Begin the intake process, upload required documents, and choose the right access site for your case.</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-sky-700">New Patient / Guardian</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Create Account</h2>
                <p className="mt-2 text-sm text-slate-500">Fill in the patient or guardian account details to start the process.</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="09XXXXXXXXX"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      placeholder="Create password (min. 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Account Type</label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    >
                      <option>Patient</option>
                      <option>Family Member / Guardian</option>
                    </select>
                  </div>

                  {error && (
                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                      {error}
                    </div>
                  )}

                  <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
                    Please use an active mobile number to receive SMS reminders and case updates.
                  </div>

                  <button
                    type="button"
                    onClick={handleRegister}
                    disabled={loading}
                    className={`cursor-pointer w-full rounded-2xl px-5 py-3 font-semibold text-white transition ${loading ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700"}`}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                </div>

                <p className="mt-6 text-center text-sm text-slate-600">
                  Already have an account?{" "}
                  <button onClick={() => setActivePage("login")} className="cursor-pointer font-semibold text-sky-700 hover:text-sky-800">Sign in here</button>
                </p>
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
                <h3 className="mt-2 text-xl font-bold text-slate-800">Having trouble registering?</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">Patients and guardians who need help with registration may contact the support team or visit the help center for guidance.</p>
                <div className="mt-5 space-y-3">
                  <div className="cursor-pointer rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700">Hotline Support: Available during office hours</div>
                  <div className="cursor-pointer rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700">Guardian Access: Family-assisted account setup available</div>
                </div>
                <button onClick={() => setActivePage("help")} className="cursor-pointer mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Open Help & Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
