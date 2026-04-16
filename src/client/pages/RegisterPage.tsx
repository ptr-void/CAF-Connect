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
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Patient");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    const newErrors: Record<string, string> = {};
    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!email) newErrors.email = "Email Address is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const res = await fetch("/api/x_1985733_cafsys/caf/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-UserToken": (window as any).g_ck || "",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          account_type: accountType,
        }),
      });
      const data = await res.json();
      const payload = data.result || data;

      if (res.ok) {
        const userData = { name: fullName, email, user_name: payload.user_name || email };
        if (setCurrentUser) setCurrentUser(userData);
        if (setIsAuthenticated) setIsAuthenticated(true);
        localStorage.setItem("caf_portal_user", JSON.stringify(userData));
        setActivePage("tracker");
      } else {
        let errorMsg = "Registration failed. Please try again.";
        if (typeof data.error === "string") {
          errorMsg = data.error;
        } else if (data.error && data.error.message) {
          errorMsg = data.error.message;
        } else if (data.message) {
          errorMsg = data.message;
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
                  <p className="mt-3 text-sm leading-6 text-slate-600">Confirm your email to activate portal notifications.</p>
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
                    <label className="mb-2 block text-sm font-medium text-slate-700">Full Name <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setErrors({ ...errors, fullName: "" }); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.fullName ? 'bg-red-50' : 'border-slate-300'} bg-white px-4 py-3 outline-none transition focus:border-sky-500`}
                      style={errors.fullName ? { borderColor: "red" } : {}}
                    />
                    {errors.fullName && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email Address <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.email ? 'bg-red-50' : 'border-slate-300'} bg-white px-4 py-3 outline-none transition focus:border-sky-500`}
                      style={errors.email ? { borderColor: "red" } : {}}
                    />
                    {errors.email && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="password"
                      placeholder="Create password (min. 6 characters)"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: "" }); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.password ? 'bg-red-50' : 'border-slate-300'} bg-white px-4 py-3 outline-none transition focus:border-sky-500`}
                      style={errors.password ? { borderColor: "red" } : {}}
                    />
                    {errors.password && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Account Type <span style={{ color: "red" }}>*</span></label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                    >
                      <option>Patient</option>
                      <option>Family Member / Guardian</option>
                    </select>
                    <p className="mt-2 text-xs text-slate-500 ml-1">
                      {accountType === "Patient" 
                        ? "You are submitting an application for your own treatment assessment." 
                        : "You will fill out application forms on behalf of the patient. An authorization document may be required."}
                    </p>
                  </div>

                  {error && (
                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                      {error}
                    </div>
                  )}

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
                  <li className="rounded-2xl bg-slate-50 px-4 py-3">Receive case updates through portal alerts</li>
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
