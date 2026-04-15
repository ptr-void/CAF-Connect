import './app.css';
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
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
  | "auth"
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
  const [activePage, setActivePage] = useState<PageKey>("landing");

  const renderPage = () => {
    switch (activePage) {
      case "landing":
        return <LandingPage setActivePage={setActivePage} />;
      case "auth":
        return <AuthPage setActivePage={setActivePage} />;
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
