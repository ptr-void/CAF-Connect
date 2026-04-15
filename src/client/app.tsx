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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; user_name: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newPath = `/x_1985733_cafsys_${activePage}.do`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, "", newPath);
      }
    }
  }, [activePage]);

  useEffect(() => {
    const savedUser = localStorage.getItem("caf_portal_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setIsAuthenticated(true);
        return; // Prioritize local storage for custom portal users
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }

    const gUser = (window as any).g_user;
    if (gUser && gUser.userID && gUser.userID !== '') {
      setCurrentUser({
        name: (gUser.firstName || '') + ' ' + (gUser.lastName || ''),
        email: gUser.email || '',
        user_name: gUser.userName || '',
      });
      setIsAuthenticated(true);
    }
  }, []);

  const navLinks: { key: PageKey; label: string; secure?: boolean }[] = [
    { key: "landing", label: "Home" },
    { key: "eligibility", label: "Eligibility" },
    { key: "application", label: "Apply", secure: true },
    { key: "tracker", label: "Track", secure: true },
    { key: "sites", label: "Access Sites" },
    { key: "help", label: "Help" },
  ];

  const renderPage = () => {
    const securePages = ["application", "tracker", "notifications", "staff", "admin"];
    if (securePages.includes(activePage) && !isAuthenticated) {
      return <LoginPage setActivePage={setActivePage} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />;
    }

    switch (activePage) {
      case "landing":
        return <LandingPage setActivePage={setActivePage} />;
      case "login":
        return <LoginPage setActivePage={setActivePage} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />;
      case "register":
        return <RegisterPage setActivePage={setActivePage} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />;
      case "eligibility":
        return <EligibilityPage setActivePage={setActivePage} />;
      case "documents":
        return <DocumentsPage setActivePage={setActivePage} />;
      case "application":
        return <ApplicationPage setActivePage={setActivePage} currentUser={currentUser} />;
      case "tracker":
        return <TrackerPage setActivePage={setActivePage} currentUser={currentUser} />;
      case "sites":
        return <AccessSitesPage setActivePage={setActivePage} />;
      case "notifications":
        return <NotificationsPage setActivePage={setActivePage} currentUser={currentUser} />;
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div
            className="cursor-pointer"
            onClick={() => setActivePage("landing")}
          >
            <h1 className="text-2xl font-bold text-sky-700">CAF Access Navigator</h1>
            <p className="text-sm text-slate-500">
              Cancer Assistance Fund guidance, intake, and tracking platform
            </p>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.filter(l => !l.secure || isAuthenticated).map((link) => (
              <button
                key={link.key}
                onClick={() => setActivePage(link.key)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm transition ${
                  activePage === link.key
                    ? "bg-sky-100 font-semibold text-sky-800"
                    : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                      {currentUser && (
                        <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-slate-50 rounded-full border border-slate-200">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=bae6fd&color=0369a1`} className="w-6 h-6 rounded-full" alt="avatar" />
                          <span className="font-medium">{currentUser.name.split(' ')[0]}</span>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setIsAuthenticated(false);
                          setCurrentUser(null);
                          localStorage.removeItem("caf_portal_user");
                          setActivePage("login");
                        }}
                        className="cursor-pointer text-sm font-medium text-slate-600 hover:text-red-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
              <>
                <button
                  onClick={() => setActivePage("login")}
                  className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    activePage === "login"
                      ? "bg-sky-700 text-white"
                      : "bg-sky-600 text-white hover:bg-sky-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActivePage("register")}
                  className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    activePage === "register"
                      ? "border-sky-500 text-sky-700"
                      : "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-700"
                  }`}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>{renderPage()}</main>
    </div>
  );
}

export default App;

