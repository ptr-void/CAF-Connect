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

  return <div className="min-h-screen bg-slate-50 text-slate-800">{renderPage()}</div>;
}

export default App;
