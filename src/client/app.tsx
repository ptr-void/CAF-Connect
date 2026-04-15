import './app.css';
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EligibilityPage from "./pages/EligibilityPage";
import DocumentsPage from "./pages/DocumentsPage";
import ApplicationPage from "./pages/ApplicationPage";
import TrackerPage from "./pages/TrackerPage";
import AccessSitesPage from "./pages/AccessSitesPage";
import NotificationsPage from "./pages/NotificationsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import StaffDashboardPage from "./pages/StaffDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

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

function App() {
  const getInitialPage = (): PageKey => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/_([a-z]+)\.do$/);
      if (match && match[1]) {
        return match[1] as PageKey;
      }
    }
    return "landing";
  };

  const [activePage, setActivePage] = useState<PageKey>(getInitialPage());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newPath = `/x_1985733_cafsys_${activePage}.do`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, "", newPath);
      }
    }
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case "landing":
        return <LandingPage setActivePage={setActivePage} />;
      case "login":
        return <LoginPage setActivePage={setActivePage} />;
      case "register":
        return <RegisterPage setActivePage={setActivePage} />;
      case "eligibility":
        return <EligibilityPage setActivePage={setActivePage} />;
      case "documents":
        return <DocumentsPage setActivePage={setActivePage} />;
      case "application":
        return <ApplicationPage setActivePage={setActivePage} />;
      case "tracker":
        return <TrackerPage setActivePage={setActivePage} />;
      case "sites":
        return <AccessSitesPage setActivePage={setActivePage} />;
      case "notifications":
        return <NotificationsPage setActivePage={setActivePage} />;
      case "help":
        return <HelpSupportPage setActivePage={setActivePage} />;
      case "staff":
        return <StaffDashboardPage setActivePage={setActivePage} />;
      case "admin":
        return <AdminDashboardPage setActivePage={setActivePage} />;
      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  const navLinks: { key: PageKey; label: string }[] = [
    { key: "landing", label: "Home" },
    { key: "eligibility", label: "Eligibility" },
    { key: "application", label: "Apply" },
    { key: "tracker", label: "Track" },
    { key: "sites", label: "Access Sites" },
    { key: "help", label: "Help" }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div 
            className="flex cursor-pointer items-center gap-3 transition-transform hover:scale-105" 
            onClick={() => setActivePage("landing")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-md">
              <span className="font-bold">CAF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-slate-800">CAF Access Navigator</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/60 bg-white/50 p-1 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => setActivePage(link.key)}
                className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activePage === link.key
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            <button
              onClick={() => setActivePage("login")}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white/80 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-slate-50 hover:ring-2 hover:ring-slate-200/50"
            >
              Sign In
            </button>
            <button
              onClick={() => setActivePage("register")}
              className="cursor-pointer rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-sky-500"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{renderPage()}</main>

      <footer className="mt-auto border-t border-slate-200 bg-white shadow-inner">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                <span className="text-xs font-bold">CAF</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800">Access Navigator</h4>
            </div>
            <p className="text-sm leading-6 text-slate-500">
              A healthcare service platform for patient intake, document guidance, case tracking, and access site coordination.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-800">Quick Links</p>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <button onClick={() => setActivePage("eligibility")} className="block cursor-pointer transition-colors hover:text-emerald-600">
                Eligibility Checker
              </button>
              <button onClick={() => setActivePage("application")} className="block cursor-pointer transition-colors hover:text-emerald-600">
                Patient Application
              </button>
              <button onClick={() => setActivePage("tracker")} className="block cursor-pointer transition-colors hover:text-emerald-600">
                Application Tracker
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-800">Support</p>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p className="cursor-pointer transition-colors hover:text-sky-600">Hotline Support</p>
              <p className="cursor-pointer transition-colors hover:text-sky-600">SMS Notification Assistance</p>
              <p className="cursor-pointer transition-colors hover:text-sky-600">Site Coordinator Helpdesk</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-800">System Access</p>
            <div className="mt-4 space-y-3">
              <button onClick={() => setActivePage("staff")} className="block cursor-pointer text-sm text-slate-500 transition-colors hover:text-violet-600">
                Staff Dashboard
              </button>
              <button onClick={() => setActivePage("admin")} className="block cursor-pointer text-sm text-slate-500 transition-colors hover:text-violet-600">
                Admin Dashboard
              </button>
              <button onClick={() => setActivePage("notifications")} className="block cursor-pointer text-sm text-slate-500 transition-colors hover:text-violet-600">
                Notifications Center
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
