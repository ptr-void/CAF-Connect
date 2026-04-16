import { useState } from "react";

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

type EligibilityPageProps = {
  setActivePage: (page: PageKey) => void;
};

function EligibilityPage({ setActivePage }: EligibilityPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  
  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    region: "",
    contact: "",
    type: "Patient",
    diagnosis: "",
    facility: "",
    hasAbstract: "Select answer",
    hasId: "Select answer",
    visitedOffice: "Not Sure",
    medical_abstract: "Patient presented with a biopsy-confirmed case needing financial oncology support." 
  });

  const [aiResult, setAiResult] = useState({ outcome: "", reasoning: "" });

  const steps = [
    "Patient Information",
    "Medical & Assistance Details",
    "Eligibility Result", 
  ];

  const handleNextStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.patient_name) newErrors.patientName = "Patient Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.region || formData.region === 'Select location') newErrors.region = "Region is required";
    if (!formData.contact) newErrors.contact = "Contact Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setCurrentStep(2);
    }
  };

  const handleNextToStep3WithValidation = async () => {
    const newErrors: Record<string, string> = {};
    if (!formData.diagnosis) newErrors.diagnosis = "Diagnosis is required";
    if (!formData.facility) newErrors.facility = "Facility is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    await handleNextToStep3();
  };
  
  const handleNextToStep3 = async () => {
    setCurrentStep(3);
    setIsLoading(true);
    
    try {
      
      const res = await fetch("/api/x_1985733_cafsys/caf/groq/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-UserToken": (window as any).g_ck || "",
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      const payload = data.result || data;
      
      if (!res.ok) {
          let errorMsg = payload.error || payload.details || payload;
          if (typeof errorMsg === 'object') {
              errorMsg = JSON.stringify(errorMsg);
          }
          throw new Error(errorMsg);
      }

      if (payload.outcome) {
          setAiResult(payload);
      } else {
          setAiResult({ outcome: "Needs Manual Review", reasoning: "Could not automatically determine eligibility via AI. Please submit." });
      }
    } catch(err: any) {
      console.error(err);
      setAiResult({ outcome: "Error", reasoning: `Server replied: ${err.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Eligibility Checker</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Answer a few guided questions to determine if the patient may qualify for Cancer
              Assistance Fund support.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("documents")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              View Documents Guide
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  const isDone = currentStep > stepNumber;

                  return (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                          isDone
                            ? "bg-emerald-600 text-white"
                            : isActive
                              ? "bg-sky-600 text-white"
                              : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {stepNumber}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isActive ? "text-sky-700" : "text-slate-700"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="mx-2 hidden h-1 w-10 rounded-full bg-slate-200 md:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {currentStep === 1 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 1</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Patient Information</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Provide the basic patient details so the AI system can guide the eligibility review.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Patient Full Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.patient_name}
                      onChange={(e) => { setFormData({...formData, patient_name: e.target.value}); setErrors({...errors, patientName: ""}); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.patientName ? 'border-red-500 bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`}
                    />
                    {errors.patientName && <p className="mt-1 text-xs text-red-500">{errors.patientName}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Age <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={(e) => { setFormData({...formData, age: e.target.value}); setErrors({...errors, age: ""}); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.age ? 'border-red-500 bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`}
                    />
                    {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Region / Province <span style={{ color: "red" }}>*</span>
                    </label>
                    <select 
                      value={formData.region}
                      onChange={(e) => { setFormData({...formData, region: e.target.value}); setErrors({...errors, region: ""}); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.region ? 'border-red-500 bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`}>
                      <option>Select location</option>
                      <option>National Capital Region</option>
                      <option>Region VII - Central Visayas</option>
                      <option>Region XI - Davao Region</option>
                      <option>Region V - Bicol Region</option>
                    </select>
                    {errors.region && <p className="mt-1 text-xs text-red-500">{errors.region}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Contact Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="09XXXXXXXXX"
                      value={formData.contact}
                      onChange={(e) => { setFormData({...formData, contact: e.target.value}); setErrors({...errors, contact: ""}); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.contact ? 'border-red-500 bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`}
                    />
                    {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Applicant Type
                    </label>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="cursor-pointer rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                        <input type="radio" checked={formData.type === "Patient"} onChange={() => setFormData({...formData, type: "Patient"})} name="applicantType" className="mr-2" />
                        Patient
                      </label>
                      <label className="cursor-pointer rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                        <input type="radio" checked={formData.type === "Family Member"} onChange={() => setFormData({...formData, type: "Family Member"})} name="applicantType" className="mr-2" />
                        Family Member
                      </label>
                      <label className="cursor-pointer rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                        <input type="radio" checked={formData.type === "Guardian"} onChange={() => setFormData({...formData, type: "Guardian"})} name="applicantType" className="mr-2" />
                        Guardian / Representative
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-end">
                  <button
                    onClick={handleNextStep1}
                    className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 2</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  Medical & Assistance Details
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Answer the healthcare-related questions to assess the next steps in the process.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Diagnosis Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter diagnosis"
                      value={formData.diagnosis}
                      onChange={(e) => { setFormData({...formData, diagnosis: e.target.value}); setErrors({...errors, diagnosis: ""}); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.diagnosis ? 'border-red-500 bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`}
                    />
                    {errors.diagnosis && <p className="mt-1 text-xs text-red-500">{errors.diagnosis}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Treatment Facility <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter hospital / treatment center"
                      value={formData.facility}
                      onChange={(e) => { setFormData({...formData, facility: e.target.value}); setErrors({...errors, facility: ""}); }}
                      className={`cursor-pointer w-full rounded-2xl border ${errors.facility ? 'border-red-500 bg-red-50' : 'border-slate-300'} px-4 py-3 outline-none focus:border-sky-500`}
                    />
                    {errors.facility && <p className="mt-1 text-xs text-red-500">{errors.facility}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Has medical abstract?
                    </label>
                    <select 
                      value={formData.hasAbstract}
                      onChange={(e) => setFormData({...formData, hasAbstract: e.target.value})}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>Select answer</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Has valid identification?
                    </label>
                    <select 
                      value={formData.hasId}
                      onChange={(e) => setFormData({...formData, hasId: e.target.value})}
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>Select answer</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Supporting Documents / Patient Diagnosis
                    </label>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="cursor-pointer w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 bg-white"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      Required for the AI Review Result Summary / Feedback.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Has the patient already visited a CAF access site or social service office?
                    </label>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="cursor-pointer rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                        <input type="radio" checked={formData.visitedOffice === "Yes"} onChange={() => setFormData({...formData, visitedOffice: "Yes"})} name="visitedOffice" className="mr-2" />
                        Yes
                      </label>
                      <label className="cursor-pointer rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                        <input type="radio" checked={formData.visitedOffice === "No"} onChange={() => setFormData({...formData, visitedOffice: "No"})} name="visitedOffice" className="mr-2" />
                        No
                      </label>
                      <label className="cursor-pointer rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                        <input type="radio" checked={formData.visitedOffice === "Not Sure"} onChange={() => setFormData({...formData, visitedOffice: "Not Sure"})} name="visitedOffice" className="mr-2" />
                        Not Sure
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextToStep3WithValidation}
                    disabled={isLoading}
                    className="cursor-pointer rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
                  >
                    {isLoading ? "Evaluating..." : "Check Eligibility"}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 3</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Eligibility Result</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Based on the information provided, here is the Groq guided screening result.
                </p>

                {isLoading ? (
                  <div className="mt-12 flex flex-col items-center justify-center space-y-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600"></div>
                    <p className="text-sm font-semibold text-sky-700">Analyzing abstract with Llama 3.3 70B...</p>
                  </div>
                ) : (
                  <>
                    <div className={`mt-6 rounded-3xl p-6 ring-1 ${aiResult.outcome.includes('Not') ? 'bg-red-50 ring-red-200' : 'bg-emerald-50 ring-emerald-200'}`}>
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className={`text-sm font-semibold ${aiResult.outcome.includes('Not') ? 'text-red-700' : 'text-emerald-700'}`}>Screening Outcome</p>
                          <h3 className={`mt-2 text-3xl font-bold ${aiResult.outcome.includes('Not') ? 'text-red-700' : 'text-emerald-700'}`}>{aiResult.outcome || "Possibly Eligible"}</h3>
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
                            {aiResult.reasoning || "The patient may qualify for CAF support, but some documents or details may still need verification by the assigned site coordinator or social service office."}
                          </p>
                        </div>
    
                        <div className={`cursor-pointer rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ${aiResult.outcome.includes('Not') ? 'ring-red-100' : 'ring-emerald-100'}`}>
                          <p className="text-sm font-semibold text-slate-700">Recommended Action</p>
                          <p className="mt-2 text-sm text-slate-600">
                            Proceed to application and prepare the required documents.
                          </p>
                        </div>
                      </div>
                    </div>
    
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                        <p className="text-sm font-semibold text-sky-700">Next Steps</p>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                          <li className="rounded-2xl bg-slate-50 px-4 py-3">
                            Review the required documents checklist
                          </li>
                          <li className="rounded-2xl bg-slate-50 px-4 py-3">
                            Complete the patient intake application form
                          </li>
                          <li className="rounded-2xl bg-slate-50 px-4 py-3">
                            Select the correct access site or hospital office
                          </li>
                        </ul>
                      </div>
    
                      <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                        <p className="text-sm font-semibold text-amber-700">Needs Review Notes</p>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                            AI Eligibility score is preliminary and subject to validation.
                          </div>
                          <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                            Selected access site should confirm eligibility requirements
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActivePage("documents")}
                    className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                  >
                    View Documents Guide
                  </button>
                  <button
                    onClick={() => setActivePage("application")}
                    disabled={isLoading}
                    className={`cursor-pointer rounded-2xl px-6 py-3 font-semibold text-white ${isLoading ? 'bg-slate-400' : 'bg-sky-600 hover:bg-sky-700'}`}
                  >
                    Continue to Application
                  </button>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="cursor-pointer rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
                  >
                    Start Again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-sky-700">Guided Screening</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Why use the checker?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The eligibility checker helps patients and guardians understand the process before
                preparing documents and submitting the full application.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Easy step-by-step healthcare-friendly flow
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Powered by Llama 3 AI for instant evaluation
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 ring-1 ring-sky-200">
              <p className="text-sm font-semibold text-slate-700">Helpful reminder</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Screening is only the first step
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Final assessment may still require document review and confirmation by the assigned
                site or coordinator.
              </p>

              <button
                onClick={() => setActivePage("help")}
                className="mt-6 w-full cursor-pointer rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Open Help Center
              </button>
            </div>
            
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Quick Links</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("sites")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Access Sites Directory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EligibilityPage;
