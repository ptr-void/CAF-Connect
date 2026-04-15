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
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 px-6 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all hover:bg-white/80">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-800">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">Sign in to your patient or guardian account</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 backdrop-blur-sm transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 backdrop-blur-sm transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="remember-me" className="ml-2 block cursor-pointer text-sm font-medium text-slate-600 transition-colors hover:text-slate-800">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="cursor-pointer font-semibold text-emerald-600 transition-colors hover:text-emerald-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full cursor-pointer justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3  text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Sign in securely
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Not registered yet?{" "}
          <button
            onClick={() => setActivePage("register")}
            className="cursor-pointer font-semibold text-emerald-600 transition-colors hover:text-emerald-500"
          >
            Create an account
          </button>
        </p>
      </div>

      <div className="mt-8 flex gap-4 text-sm font-medium">
        <button
          onClick={() => setActivePage("eligibility")}
          className="cursor-pointer rounded-full bg-white/60 px-5 py-2 text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-sky-700 hover:shadow-md"
        >
          Check Eligibility First
        </button>
        <button
          onClick={() => setActivePage("tracker")}
          className="cursor-pointer rounded-full bg-white/60 px-5 py-2 text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-sky-700 hover:shadow-md"
        >
          Track Application
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
