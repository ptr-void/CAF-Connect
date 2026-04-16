import { useState, useEffect } from "react";

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

type DocumentsPageProps = {
  setActivePage: (page: PageKey) => void;
  currentUser?: any;
};

function getStatusClasses(status: string) {
  if (status === "Uploaded") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (status === "Missing") {
    return "bg-amber-100 text-amber-500 font-bold";
  }
  if (status === "Needs Correction") {
    return "bg-rose-100 text-rose-700 font-bold";
  }
  return "bg-slate-100 text-slate-700";
}

function DocumentsPage({ setActivePage, currentUser }: DocumentsPageProps) {
  const [requiredDocs, setRequiredDocs] = useState<any[]>([]);
  const [profileDocs, setProfileDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    const site = "";

    const reqsPromise = fetch(`/api/x_1985733_cafsys/caf/documents/requirements${site ? `?site=${encodeURIComponent(site)}` : ""}`, {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    }).then(res => res.json());

    const profilePromise = currentUser?.email
      ? fetch(`/api/x_1985733_cafsys/caf/profile/documents?email=${encodeURIComponent(currentUser.email)}`, {
        headers: { "X-UserToken": (window as any).g_ck || "" }
      }).then(res => res.json())
      : Promise.resolve({ result: [] });

    Promise.all([reqsPromise, profilePromise])
      .then(([reqsData, profileData]) => {
        const reqsArr = reqsData.result || reqsData;
        const profileArr = profileData.result || profileData;
        setRequiredDocs(Array.isArray(reqsArr) ? reqsArr : []);
        setProfileDocs(Array.isArray(profileArr) ? profileArr : []);
      })
      .catch(err => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docName: string) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.email) return;

    setUploadingDoc(docName);
    try {
      const apiKey = "367759188279963";
      const apiSecret = "4T0twk-P-EIKvemW4aeGAK75etI";
      const timestamp = Math.round(new Date().getTime() / 1000).toString();

      const signatureString = `timestamp=${timestamp}${apiSecret}`;
      const msgBuffer = new TextEncoder().encode(signatureString);
      const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const signature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/defkzzqcs/auto/upload", {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      if (!cloudRes.ok) throw new Error(cloudData.error?.message || "Cloudinary error");

      const snRes = await fetch("/api/x_1985733_cafsys/caf/profile/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-UserToken": (window as any).g_ck || ""
        },
        body: JSON.stringify({
          email: currentUser.email,
          document_name: docName,
          file_url: cloudData.secure_url
        })
      });

      if (!snRes.ok) throw new Error("Failed to save to ServiceNow profile");

      fetchData();
    } catch (err: any) {
      alert("Error uploading: " + err.message);
    } finally {
      setUploadingDoc(null);
    }
  };

  const getDocStatus = (docName: string) => {
    const found = profileDocs.find(d => d.document_name === docName);
    return found ? found.status : "Missing";
  };

  const statusCounts = {
    uploaded: requiredDocs.filter(d => getDocStatus(d.name) === "Uploaded").length,
    missing: requiredDocs.filter(d => getDocStatus(d.name) === "Missing").length,
    correction: requiredDocs.filter(d => getDocStatus(d.name) === "Needs Correction").length,
    optional: 1
  };

  const totalCompleted = statusCounts.uploaded;
  const totalItems = requiredDocs.length;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Document Requirements Guide</h1>
            <p className="mt-2 max-w-3xl text-slate-600 italic">
              Review the required documents, see status markers, and upload missing or corrected files before submitting the patient application.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("eligibility")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-sky-400"
            >
              Back to Eligibility
            </button>
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-sky-700"
            >
              Continue to Application
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Required Files</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    Organized checklist for CAF document submission
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Patients and guardians can review what has already been submitted and what still needs attention.
                  </p>
                </div>

                {!loading && totalItems > 0 && (
                  <div className="rounded-2xl bg-sky-50 px-5 py-3 text-sm font-bold text-sky-700 ring-1 ring-sky-100">
                    Upload progress: {totalCompleted} of {totalItems} completed
                  </div>
                )}
              </div>

              <div className="mt-10 space-y-6">
                {loading ? (
                  <p className="text-center py-10 text-slate-500">Loading checklist assignments...</p>
                ) : requiredDocs.length === 0 ? (
                  <p className="text-center py-10 text-slate-500">No specific requirements found for this site.</p>
                ) : requiredDocs.map((doc) => {
                  const status = getDocStatus(doc.name);
                  const isUploading = uploadingDoc === doc.name;

                  return (
                    <div key={doc.sys_id || doc.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-800">{doc.name}</h3>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                              {doc.category}
                            </span>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-slate-600">{doc.note}</p>
                        </div>
                        <span className={`rounded-xl px-4 py-1.5 text-xs font-bold uppercase tracking-wide shadow-sm ${getStatusClasses(status)}`}>
                          {status}
                        </span>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4">
                        <label className={`cursor-pointer rounded-2xl px-6 py-2.5 text-sm font-bold text-white shadow-md transition ${isUploading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-black'}`}>
                          {isUploading ? "Uploading..." : status === "Uploaded" ? "Update Document" : "Upload File"}
                          <input type="file" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, doc.name)} />
                        </label>
                        <button className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700">
                          View Guidance
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Checklist Summary</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-800">Submission status overview</h3>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
                  <span className="font-semibold text-slate-600">Uploaded</span>
                  <span className="text-lg font-bold text-emerald-600">{statusCounts.uploaded}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
                  <span className="font-semibold text-slate-600">Missing</span>
                  <span className="text-lg font-bold text-amber-500">{statusCounts.missing}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-rose-50 px-5 py-4 ring-1 ring-rose-100">
                  <span className="font-semibold text-rose-700">Needs Correction</span>
                  <span className="text-lg font-bold text-rose-700">{statusCounts.correction}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
                  <span className="font-semibold text-slate-600">Optional</span>
                  <span className="text-lg font-bold text-slate-700">{statusCounts.optional}</span>
                </div>
              </div>

              <button
                onClick={() => setActivePage("application")}
                className="mt-8 w-full cursor-pointer rounded-2xl bg-sky-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-sky-700 transition"
              >
                Continue Application
              </button>
            </div>

            <div className="rounded-3xl bg-emerald-50 p-8 ring-1 ring-emerald-100 border-l-8 border-emerald-400">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Helpful reminder</p>
              <h3 className="mt-3 text-xl font-bold text-slate-800 leading-tight">Missing files may delay case review</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Patients are encouraged to complete the document checklist before final submission to reduce review delays and follow-up requests.
              </p>
              <button className="mt-6 w-full cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm hover:shadow-md transition">
                View Notification Reminders
              </button>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Quick Access</p>
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setActivePage("sites")}
                  className="w-full cursor-pointer rounded-2xl border border-slate-200 px-5 py-3.5 text-left text-sm font-bold text-slate-700 hover:border-sky-400 hover:bg-sky-50"
                >
                  Access Sites Directory
                </button>
                <button
                  onClick={() => setActivePage("tracker")}
                  className="w-full cursor-pointer rounded-2xl border border-slate-200 px-5 py-3.5 text-left text-sm font-bold text-slate-700 hover:border-sky-400 hover:bg-sky-50"
                >
                  Case Status Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentsPage;
