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
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; user_name: string; account_type?: string; assigned_site?: string } | null>(null);

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
        return;
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
    { key: "staff", label: "Staff Dashboard", secure: true },
    { key: "admin", label: "Admin Dashboard", secure: true },
    { key: "sites", label: "Access Sites" },
    { key: "help", label: "Help" },
  ];

  const renderPage = () => {
    const securePages = ["application", "tracker", "notifications", "staff", "admin"];
    if (securePages.includes(activePage) && !isAuthenticated) {
      return <LoginPage setActivePage={setActivePage} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />;
    }

    // Role guarding
    if (activePage === "admin" && currentUser?.account_type !== "Administrator") {
       return <LandingPage setActivePage={setActivePage} />;
    }
    if (activePage === "staff" && (currentUser?.account_type !== "Coordinator" && currentUser?.account_type !== "Site Coordinator" && currentUser?.account_type !== "Administrator")) {
       return <LandingPage setActivePage={setActivePage} />;
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
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div
            className="cursor-pointer"
            onClick={() => setActivePage("landing")}
          >
            <h1 className="text-2xl font-bold text-sky-700">CAF Access Navigator</h1>
            <p className="text-sm text-slate-500">
              Cancer Assistance Fund portal
            </p>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.filter(l => {
              if (l.secure && !isAuthenticated) return false;
              if (l.key === "staff" && currentUser?.account_type !== "Coordinator" && currentUser?.account_type !== "Site Coordinator" && currentUser?.account_type !== "Administrator") return false;
              if (l.key === "admin" && currentUser?.account_type !== "Administrator") return false;
              if ((l.key === "application" || l.key === "tracker") && 
                  currentUser && currentUser.account_type !== "Patient" && currentUser.account_type !== "Family Member / Guardian" && currentUser.account_type !== "Applicant") {
                return false;
              }
              return true;
            }).map((link) => (
              <button
                key={link.key}
                onClick={() => setActivePage(link.key)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm transition ${activePage === link.key
                  ? "bg-sky-100 font-semibold text-sky-800"
                  : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setActivePage("notifications")}
                  className={`relative cursor-pointer transition ${activePage === "notifications" ? "text-sky-700" : "text-slate-500 hover:text-sky-700"}`}
                >
                  {activePage === "notifications" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  )}
                  {activePage !== "notifications" && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                </button>

                {currentUser && (
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=bae6fd&color=0369a1&size=50`} 
                      className="h-8 w-8 rounded-full shadow-sm ring-2 ring-white" 
                      alt="avatar" 
                    />
                    <div className="hidden sm:block">
                      <p className="text-sm font-bold text-slate-700 leading-none">{currentUser.name.split(' ')[0]}</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">{currentUser.account_type}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setCurrentUser(null);
                    localStorage.removeItem("caf_portal_user");
                    setActivePage("login");
                    window.location.reload();
                  }}
                  className="cursor-pointer text-sm font-bold text-sky-700 hover:text-red-600 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActivePage("login")}
                  className="cursor-pointer rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-700 shadow-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActivePage("register")}
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
