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

type ApplicationPageProps = {
  setActivePage: (page: PageKey) => void;
  currentUser?: any;
};

function ApplicationPage({ setActivePage, currentUser }: ApplicationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sites, setSites] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/x_1985733_cafsys/caf/sites", {
      headers: { "X-UserToken": (window as any).g_ck || "" }
    })
      .then(res => res.json())
      .then(data => {
        const payload = data.result || data;
        setSites(Array.isArray(payload) ? payload : []);
      })
      .catch(err => console.error("Error fetching sites:", err));
  }, []);

  const [patientName, setPatientName] = useState(currentUser?.name || "");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [repName, setRepName] = useState("");
  const [relationship, setRelationship] = useState("");


  const [diagnosis, setDiagnosis] = useState("");
  const [diagnosisDate, setDiagnosisDate] = useState("");
  const [hospital, setHospital] = useState("");
  const [physician, setPhysician] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [treatmentNotes, setTreatmentNotes] = useState("");


  const [selectedSite, setSelectedSite] = useState("");
  const [contactEmail, setContactEmail] = useState(currentUser?.email || "");
  const [mobileNumber, setMobileNumber] = useState("");
  const [coordNotes, setCoordNotes] = useState("");

  const [documentUrl, setDocumentUrl] = useState("");
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const steps = ["Personal Details", "Diagnosis Details", "Access Site & Contact", "Review & Submit"];

  const handleNextStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!patientName) newErrors.patientName = "Patient Name is required";
    if (!birthDate) newErrors.birthDate = "Birth Date is required";
    if (!sex) newErrors.sex = "Sex is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile Number is required";
    if (!contactEmail) newErrors.contactEmail = "Email is required";
    if (!address) newErrors.address = "Address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setCurrentStep(2);
    }
  };

  const handleNextStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!diagnosis) newErrors.diagnosis = "Diagnosis is required";
    if (!diagnosisDate) newErrors.diagnosisDate = "Date of Diagnosis is required";
    if (!hospital) newErrors.hospital = "Treating Hospital is required";
    if (!physician) newErrors.physician = "Attending Physician is required";
    if (!requestedAmount) newErrors.requestedAmount = "Requested Assistance Amount is required";
    if (!documentUrl) newErrors.documentUrl = "Medical Abstract is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setCurrentStep(3);
    }
  };


  const selectedSiteData = sites.find(s => s.site_name === selectedSite);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
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

      const response = await fetch(`https://api.cloudinary.com/v1_1/defkzzqcs/auto/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");

      setDocumentUrl(data.secure_url);
    } catch (err: any) {
      alert("Failed to upload document: " + err.message);
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/x_1985733_cafsys/caf/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-UserToken": (window as any).g_ck || "",
        },
        body: JSON.stringify({
          patient_name: patientName,
          email: currentUser?.email || contactEmail,
          medical_condition: diagnosis,
          requested_amount: requestedAmount,
          selected_site: selectedSite || "Pending Assignment",
          phone_number: mobileNumber,
          document_url: documentUrl,
          medical_abstract: `
Birth Date: ${birthDate}
Sex: ${sex}
Address: ${address}
Representative: ${repName} (${relationship})
Hospital: ${hospital}
Physician: ${physician}
Diagnosis Date: ${diagnosisDate}
Notes: ${treatmentNotes}
Coordination Notes: ${coordNotes}
          `.trim(),
        }),
      });

      const data = await res.json();
      const payload = data.result || data;

      if (!res.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : payload.error?.message || "Failed to submit application");
      }

      setActivePage("tracker");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Patient Intake / Application Form</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Complete the guided intake form for CAF assistance. The process is divided into clear steps so patients and guardians can submit information with less confusion.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("documents")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Review Documents
            </button>
            <button
              onClick={() => setActivePage("tracker")}
              className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Track Application
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isDone = currentStep > stepNumber;
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${isDone ? "bg-emerald-600 text-white" : isActive ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-600"}`}>
                      {stepNumber}
                    </div>
                    <p className={`text-sm font-semibold ${isActive ? "text-sky-700" : "text-slate-700"}`}>{step}</p>
                    {index !== steps.length - 1 && <div className="mx-2 hidden h-1 w-10 rounded-full bg-slate-200 md:block" />}
                  </div>
                );
              })}
            </div>

            {currentStep === 1 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 1</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Personal Details</h2>
                <p className="mt-2 text-sm text-slate-500">Enter the patient and applicant information exactly as it appears on official documents.</p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Patient Full Name <span style={{ color: "red" }}>*</span></label>
                    <input type="text" value={patientName} onChange={(e) => { setPatientName(e.target.value); setErrors({ ...errors, patientName: "" }); }} placeholder="Enter patient full name" className={`w-full rounded-2xl border ${errors.patientName ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.patientName ? { borderColor: "red" } : {}} />
                    {errors.patientName && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.patientName}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Birth Date <span style={{ color: "red" }}>*</span></label>
                    <input type="date" value={birthDate} onChange={(e) => { setBirthDate(e.target.value); setErrors({ ...errors, birthDate: "" }); }} className={`w-full rounded-2xl border ${errors.birthDate ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.birthDate ? { borderColor: "red" } : {}} />
                    {errors.birthDate && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.birthDate}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Sex <span style={{ color: "red" }}>*</span></label>
                    <select value={sex} onChange={(e) => { setSex(e.target.value); setErrors({ ...errors, sex: "" }); }} className={`w-full rounded-2xl border ${errors.sex ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.sex ? { borderColor: "red" } : {}}>
                      <option value="">Select sex</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {errors.sex && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.sex}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Mobile Number <span style={{ color: "red" }}>*</span></label>
                    <input type="text" value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value); setErrors({ ...errors, mobileNumber: "" }); }} placeholder="09XXXXXXXXX" className={`w-full rounded-2xl border ${errors.mobileNumber ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.mobileNumber ? { borderColor: "red" } : {}} />
                    {errors.mobileNumber && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.mobileNumber}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Contact Email <span style={{ color: "red" }}>*</span></label>
                    <input type="email" value={contactEmail} onChange={(e) => { setContactEmail(e.target.value); setErrors({ ...errors, contactEmail: "" }); }} placeholder="Email for case updates" className={`w-full rounded-2xl border ${errors.contactEmail ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.contactEmail ? { borderColor: "red" } : {}} />
                    {errors.contactEmail && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.contactEmail}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Home Address <span style={{ color: "red" }}>*</span></label>
                    <textarea rows={3} value={address} onChange={(e) => { setAddress(e.target.value); setErrors({ ...errors, address: "" }); }} placeholder="Enter complete home address" className={`w-full rounded-2xl border ${errors.address ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.address ? { borderColor: "red" } : {}} />
                    {errors.address && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Applicant / Representative Name</label>
                    <input type="text" value={repName} onChange={(e) => setRepName(e.target.value)} placeholder="If different from patient" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Relationship to Patient</label>
                    <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Parent, guardian, sibling, etc." className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={handleNextStep1} className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700">
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 2</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Diagnosis Details</h2>
                <p className="mt-2 text-sm text-slate-500">Provide the medical and treatment details needed for the initial review.</p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Diagnosis <span style={{ color: "red" }}>*</span></label>
                    <input type="text" value={diagnosis} onChange={(e) => { setDiagnosis(e.target.value); setErrors({ ...errors, diagnosis: "" }); }} placeholder="Enter diagnosis" className={`w-full rounded-2xl border ${errors.diagnosis ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.diagnosis ? { borderColor: "red" } : {}} />
                    {errors.diagnosis && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.diagnosis}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Date of Diagnosis <span style={{ color: "red" }}>*</span></label>
                    <input type="date" value={diagnosisDate} onChange={(e) => { setDiagnosisDate(e.target.value); setErrors({ ...errors, diagnosisDate: "" }); }} className={`w-full rounded-2xl border ${errors.diagnosisDate ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.diagnosisDate ? { borderColor: "red" } : {}} />
                    {errors.diagnosisDate && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.diagnosisDate}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Treating Hospital / Facility <span style={{ color: "red" }}>*</span></label>
                    <input type="text" value={hospital} onChange={(e) => { setHospital(e.target.value); setErrors({ ...errors, hospital: "" }); }} placeholder="Enter hospital or clinic" className={`w-full rounded-2xl border ${errors.hospital ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.hospital ? { borderColor: "red" } : {}} />
                    {errors.hospital && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.hospital}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Attending Physician <span style={{ color: "red" }}>*</span></label>
                    <input type="text" value={physician} onChange={(e) => { setPhysician(e.target.value); setErrors({ ...errors, physician: "" }); }} placeholder="Enter physician name" className={`w-full rounded-2xl border ${errors.physician ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.physician ? { borderColor: "red" } : {}} />
                    {errors.physician && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.physician}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Requested Assistance Amount (PHP) <span style={{ color: "red" }}>*</span></label>
                    <input type="number" step="1000" min="0" value={requestedAmount} onChange={(e) => { setRequestedAmount(e.target.value); setErrors({ ...errors, requestedAmount: "" }); }} placeholder="e.g. 50000" className={`w-full rounded-2xl border ${errors.requestedAmount ? 'bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`} style={errors.requestedAmount ? { borderColor: "red" } : {}} />
                    {errors.requestedAmount && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.requestedAmount}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Medical Abstract or Clinical Summary (PDF/Image) <span style={{ color: "red" }}>*</span></label>
                    <input type="file" accept=".pdf,image/*" onChange={(e) => { setErrors({ ...errors, documentUrl: "" }); handleFileUpload(e); }} disabled={uploadingDoc} className={`w-full cursor-pointer rounded-2xl border ${errors.documentUrl ? 'bg-red-50' : 'border-slate-300'} bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-sky-700 hover:file:bg-sky-100 disabled:opacity-50`} style={errors.documentUrl ? { borderColor: "red" } : {}} />
                    {uploadingDoc && <p className="mt-2 text-sm text-sky-600 animate-pulse">Uploading securely...</p>}
                    {documentUrl && <p className="mt-2 text-sm text-emerald-600 font-medium">✓ Document uploaded successfully</p>}
                    {errors.documentUrl && <p style={{ color: "red" }} className="mt-1 text-xs">{errors.documentUrl}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Treatment Notes / Assistance Needed</label>
                    <textarea rows={4} value={treatmentNotes} onChange={(e) => setTreatmentNotes(e.target.value)} placeholder="Briefly describe treatment need, medicines, procedure, or support required" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" />
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setCurrentStep(1)} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400">Back</button>
                  <button onClick={handleNextStep2} disabled={uploadingDoc} className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 3</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Access Site & Contact</h2>
                <p className="mt-2 text-sm text-slate-500">Select the most appropriate access site and confirm coordination details.</p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Selected Access Site</label>
            <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option value="">Select access site (optional, coordinator will assign)</option>
                      {sites.map(s => <option key={s.sys_id} value={s.site_name}>{s.site_name}</option>)}
                    </select>
                  </div>
                  {selectedSite && selectedSiteData && (
                    <div className="md:col-span-2 rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-200">
                      <h4 className="font-semibold text-sky-800 mb-3">Facility Information</h4>
                      <div className="space-y-2 text-sm text-sky-900">
                        <p><strong className="font-medium text-sky-700">Location:</strong> {selectedSiteData.address}</p>
                        <p><strong className="font-medium text-sky-700">Availability:</strong> {selectedSiteData.operating_hours}</p>
                        <p><strong className="font-medium text-sky-700">Supported Cancers:</strong> {selectedSiteData.supported_cancers}</p>
                      </div>
                    </div>
                  )}



                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Additional Coordination Notes (Optional)</label>
                    <textarea rows={3} value={coordNotes} onChange={(e) => setCoordNotes(e.target.value)} placeholder="Optional notes for staff or coordinator" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" />
                  </div>

                  <div className="md:col-span-2 mt-4 grid gap-4 md:grid-cols-2">
                    <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-slate-300">
                      <input type="checkbox" className="mt-1" />
                      <span className="text-sm text-slate-600">I agree to receive email reminders and case status updates.</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-slate-300">
                      <input type="checkbox" className="mt-1" />
                      <span className="text-sm text-slate-600">I confirm the selected access site is the correct office for this case.</span>
                    </label>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setCurrentStep(2)} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400">Back</button>
                  <button onClick={() => setCurrentStep(4)} className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700">Review Summary</button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 4</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Review & Submit</h2>
                <p className="mt-2 text-sm text-slate-500">Review the information below before final submission to the selected access site.</p>

                <div className="mt-6 grid gap-5">
                  <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">Applicant Summary</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Patient Name</p>
                        <p className="mt-2 font-semibold text-slate-800">{patientName || "—"}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Diagnosis</p>
                        <p className="mt-2 font-semibold text-slate-800">{diagnosis || "—"}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Requested Amount</p>
                        <p className="mt-2 font-semibold text-slate-800">{requestedAmount ? "₱" + parseFloat(requestedAmount).toLocaleString() : "—"}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Access Site</p>
                        <p className="mt-2 font-semibold text-slate-800">{selectedSite || "Pending coordinator assignment"}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contact Email</p>
                        <p className="mt-2 font-semibold text-slate-800">{contactEmail || "—"}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Requested Amount</p>
                        <p className="mt-2 font-semibold text-slate-800">{requestedAmount ? `₱${Number(requestedAmount).toLocaleString()}` : "—"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
                    <h3 className="text-lg font-semibold text-emerald-800">Ready for submission</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Once submitted, the application will enter the review process. You can track the status, receive portal notifications, and upload additional documents.
                    </p>
                  </div>

                  {error && (
                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                      {error}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => setCurrentStep(3)} disabled={loading} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-50">
                    Back
                  </button>
                  <button onClick={handleSubmit} disabled={loading} className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-50">
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-sky-700">Application Tips</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Make submission easier and faster</h3>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Prepare documents before completing the final step</div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Use an active email for portal updates</div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Review every section before submitting to avoid delays</div>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Quick Links</p>
              <div className="mt-4 grid gap-3">
                <button onClick={() => setActivePage("sites")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700">Access Sites Directory</button>
                <button onClick={() => setActivePage("documents")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700">Document Requirements Guide</button>
                <button onClick={() => setActivePage("tracker")} className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700">Application Tracker</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
