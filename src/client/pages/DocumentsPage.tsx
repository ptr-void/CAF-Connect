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

function DocumentsPage({ setActivePage, currentUser }: DocumentsPageProps) {
  const [requiredDocs, setRequiredDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [guidanceDoc, setGuidanceDoc] = useState<any | null>(null);

  const fetchDocs = () => {
    const fetchReqs = fetch("/api/x_1985733_cafsys/caf/documents/requirements", {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    }).then(res => res.json());

    const fetchUserDocs = currentUser?.email
      ? fetch(`/api/x_1985733_cafsys/caf/documents?email=${currentUser.email}`, {
          headers: { "X-UserToken": (window as any).g_ck || "" }
        }).then(res => res.json())
      : Promise.resolve({ result: [] });

    Promise.all([fetchReqs, fetchUserDocs])
      .then(([reqsData, docsData]) => {
        let reqs = reqsData.result || reqsData;
        let userDocs = docsData.result || docsData;

        if (!Array.isArray(reqs)) reqs = [];
        if (!Array.isArray(userDocs)) userDocs = [];

        const enriched = reqs.map((req: any) => {
          const userDoc = userDocs.find((d: any) => d.document_name === req.name);
          return {
            ...req,
            status: userDoc ? userDoc.status : "Missing",
            uploaded_url: userDoc?.document_url || null,
          };
        });

        if (enriched.length === 0) {
          enriched.push({
            name: "Medical Abstract",
            category: "Clinical Document",
            note: "Request the latest signed medical abstract from the treating physician or hospital.",
            status: "Missing",
          });
          enriched.push({
            name: "Valid Government ID",
            category: "Identity Document",
            note: "Patient or authorized representative ID must be clear and readable.",
            status: "Missing",
          });
          enriched.push({
            name: "Doctor's Prescription",
            category: "Treatment Support",
            note: "Please upload a complete prescription with signature and date.",
            status: "Missing",
          });
          enriched.push({
            name: "Laboratory / Diagnostic Results",
            category: "Clinical Supporting File",
            note: "Attach recent relevant diagnostic or laboratory results if available.",
            status: "Missing",
          });
        }

        setRequiredDocs(enriched);
      })
      .catch(err => {
        console.error("Error fetching documents:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchDocs();
  }, [currentUser]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docName: string, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(idx);
    try {
      const apiKey = "367759188279963";
      const apiSecret = "4T0twk-P-EIKvemW4aeGAK75etI";
      const timestamp = Math.round(new Date().getTime() / 1000).toString();

      const signatureString = `timestamp=${timestamp}${apiSecret}`;
      const msgBuffer = new TextEncoder().encode(signatureString);
      const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const signature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("api_key", apiKey);
      uploadData.append("timestamp", timestamp);
      uploadData.append("signature", signature);

      const response = await fetch("https://api.cloudinary.com/v1_1/defkzzqcs/auto/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");

      const secureUrl = data.secure_url;

      // Save to backend
      if (currentUser?.email) {
        await fetch("/api/x_1985733_cafsys/caf/documents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-UserToken": (window as any).g_ck || "",
          },
          body: JSON.stringify({
            email: currentUser.email,
            document_name: docName,
            document_url: secureUrl,
            status: "Uploaded",
          }),
        });
      }

      // Optimistic UI update
      setRequiredDocs(prev =>
        prev.map((d, i) =>
          i === idx ? { ...d, status: "Uploaded", uploaded_url: secureUrl } : d
        )
      );

      alert(`"${docName}" uploaded successfully!`);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingIdx(null);
      e.target.value = "";
    }
  };

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Uploaded":
        return "bg-emerald-50 text-emerald-600";
      case "Missing":
        return "bg-orange-50 text-orange-600";
      case "Needs Correction":
        return "bg-rose-50 text-rose-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusCount = (status: string) => requiredDocs.filter(d => d.status === status).length;
  const totalCompleted = requiredDocs.filter(d => d.status === "Uploaded").length;
  const totalCount = requiredDocs.length;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Document Requirements Guide</h1>
            <p className="mt-2 text-slate-600 max-w-3xl">
              Review the required documents, see status markers, and upload missing or corrected files before submitting the patient application.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("eligibility")}
              className="cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition"
            >
              Back to Eligibility
            </button>
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition shadow-sm"
            >
              Continue to Application
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Required Files</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    Organized checklist for CAF document submission
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 max-w-xl">
                    Patients and guardians can review what has already been submitted and what still needs attention.
                  </p>
                </div>
                <div className="shrink-0 bg-sky-50 text-sky-700 font-semibold px-4 py-2 rounded-xl text-sm text-center">
                  Upload progress: {totalCompleted} of {totalCount}
                  <br />completed
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {loading ? (
                  <div className="py-10 text-center text-slate-500">Loading document requirements...</div>
                ) : (
                  requiredDocs.map((document, idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-bold text-slate-800">{document.name}</h3>
                            <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">
                              {document.category}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">{document.note}</p>
                          {document.uploaded_url && (
                            <a
                              href={document.uploaded_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline"
                            >
                              View uploaded file ↗
                            </a>
                          )}
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${getBadgeStyle(
                            document.status
                          )}`}
                        >
                          {document.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <label
                          className={`cursor-pointer inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition ${
                            uploadingIdx === idx ? "opacity-60 cursor-not-allowed" : ""
                          }`}
                        >
                          {uploadingIdx === idx ? (
                            <>
                              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Uploading...
                            </>
                          ) : (
                            "Upload File"
                          )}
                          <input
                            type="file"
                            accept=".pdf,image/*,video/mp4"
                            className="sr-only"
                            disabled={uploadingIdx !== null}
                            onChange={e => handleFileUpload(e, document.name, idx)}
                          />
                        </label>
                        <button
                          onClick={() => setGuidanceDoc(document)}
                          className="cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-800 transition"
                        >
                          View Guidance
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Checklist Summary Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold text-sky-700 tracking-wide uppercase">Checklist Summary</p>
              <h3 className="mt-2 text-lg font-bold text-slate-800">Submission status overview</h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Uploaded</span>
                  <span className="text-sm font-bold text-emerald-600">{getStatusCount("Uploaded")}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Missing</span>
                  <span className="text-sm font-bold text-orange-500">{getStatusCount("Missing")}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Needs Correction</span>
                  <span className="text-sm font-bold text-rose-500">{getStatusCount("Needs Correction")}</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-sm font-semibold text-slate-600">Optional</span>
                  <span className="text-sm font-bold text-slate-500">{getStatusCount("Optional")}</span>
                </div>
              </div>

              <button
                onClick={() => setActivePage("application")}
                className="mt-6 cursor-pointer w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition shadow-sm"
              >
                Continue Application
              </button>
            </div>

            {/* Helpful Reminder Widget */}
            <div className="rounded-3xl bg-gradient-to-b from-emerald-50 to-teal-50 p-6 ring-1 ring-emerald-200">
              <p className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">Helpful reminder</p>
              <h3 className="mt-2 text-lg font-bold text-slate-800 leading-tight">
                Missing files may delay case review
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Patients are encouraged to complete the document checklist before final submission to reduce review
                delays and follow-up requests.
              </p>
              <button
                onClick={() => setActivePage("notifications")}
                className="mt-6 cursor-pointer w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition"
              >
                View Notification Reminders
              </button>
            </div>

            {/* Quick Access Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold text-violet-700 tracking-wide uppercase">Quick Access</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("sites")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700 transition"
                >
                  Access Sites Directory
                </button>
                <button
                  onClick={() => setActivePage("tracker")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-left font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700 transition"
                >
                  Case Status Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Guidance Modal */}
      {guidanceDoc && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(15,23,42,0.6)",
            backdropFilter: "blur(4px)",
          }}
          className="flex items-center justify-center p-6"
          onClick={() => setGuidanceDoc(null)}
        >
          <div
            style={{ width: "100%", maxWidth: "36rem" }}
            className="rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Document Guidance</p>
                <h3 className="mt-1 text-xl font-bold text-slate-800">{guidanceDoc.name}</h3>
              </div>
              <button
                onClick={() => setGuidanceDoc(null)}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-5">
              <div className="rounded-2xl bg-sky-50 px-5 py-4 ring-1 ring-sky-100">
                <p className="text-sm font-semibold text-sky-700">Category</p>
                <p className="mt-1 text-sm text-slate-700">{guidanceDoc.category}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Instructions</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{guidanceDoc.note}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 px-5 py-4 ring-1 ring-amber-100">
                <p className="text-sm font-semibold text-amber-700">Tips</p>
                <ul className="mt-2 space-y-2 text-sm text-amber-800 list-disc list-inside">
                  <li>Make sure documents are clear and fully readable.</li>
                  <li>Accepted formats: JPEG, PNG, PDF, MP4 (max 50MB).</li>
                  <li>All files must be recent (within the last 3 months unless specified).</li>
                  <li>Ensure signatures and dates are visible where required.</li>
                </ul>
              </div>
              <div className="flex gap-3 pt-2">
                <label className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
                  Upload this document
                  <input
                    type="file"
                    accept=".pdf,image/*,video/mp4"
                    className="sr-only"
                    onChange={e => {
                      const idx = requiredDocs.findIndex(d => d.name === guidanceDoc.name);
                      if (idx !== -1) {
                        setGuidanceDoc(null);
                        handleFileUpload(e, guidanceDoc.name, idx);
                      }
                    }}
                  />
                </label>
                <button
                  onClick={() => setGuidanceDoc(null)}
                  className="cursor-pointer flex-1 rounded-2xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentsPage;
