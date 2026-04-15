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
};

function RegisterPage({ setActivePage }: RegisterPageProps) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] xl:flex-row flex-col items-center justify-center gap-10 bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 px-6 py-12">
      
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all hover:bg-white/80">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-sm">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-800">Create Account</h2>
          <p className="mt-2 text-sm text-slate-500">Start new applications and track progress</p>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 backdrop-blur-sm transition-colors focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 backdrop-blur-sm transition-colors focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Mobile Number</label>
            <input
              type="text"
              placeholder="09XXXXXXXXX"
              className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 backdrop-blur-sm transition-colors focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 backdrop-blur-sm transition-colors focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Type</label>
            <select className="mt-2 block w-full cursor-pointer rounded-2xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 backdrop-blur-sm transition-colors focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20">
              <option>Patient</option>
              <option>Family Member / Guardian</option>
            </select>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-xs text-sky-800 backdrop-blur-sm">
            By creating an account, you agree to receive essential SMS reminders regarding your application case updates.
          </div>

          <button
            type="button"
            className="flex w-full cursor-pointer justify-center rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            onClick={() => setActivePage("login")}
            className="cursor-pointer font-semibold text-sky-600 transition-colors hover:text-sky-500"
          >
            Log in instead
          </button>
        </p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="rounded-3xl border border-slate-200/60 bg-white/40 p-6 shadow-sm backdrop-blur-md">
          <h3 className="text-xl font-bold text-slate-800">Why register securely?</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3 shadow-sm hover:scale-[1.01] transition-transform">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">✓</span>
              Save incomplete applications as drafts
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3 shadow-sm hover:scale-[1.01] transition-transform">
               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">✓</span>
              Manage strictly required medical documents easily
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3 shadow-sm hover:scale-[1.01] transition-transform">
               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">✓</span>
              Real-time SMS alerts tracking application statuses
            </li>
          </ul>
        </div>
        
        <div className="rounded-3xl border border-slate-200/60 bg-white/40 p-6 shadow-sm backdrop-blur-md">
          <h3 className="text-lg font-bold text-slate-800">Secure Healthcare Data</h3>
          <p className="mt-2 text-sm text-slate-600">
            All registered data is compliant with standard security protocols linking directly to appropriate CAF site coordinators nationwide.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
