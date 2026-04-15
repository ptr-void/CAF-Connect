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
  const steps = ["Patient Information", "Medical & Assistance Details", "Review Result"];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-sky-50/50 to-emerald-50/50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-sky-100/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-700 backdrop-blur-sm">
              Step-by-step
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-800">Eligibility Checker</h1>
            <p className="mt-3 max-w-3xl text-lg text-slate-600">
              Answer a few guided questions to securely verify if the patient qualifies for Cancer Assistance Fund support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePage("documents")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white/80 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-slate-50 hover:ring-2 hover:ring-slate-200"
            >
              Requirements Guide
            </button>
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-slate-800"
            >
              Apply Now
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2.5rem] border border-white/60 bg-white/60 p-8 shadow-xl backdrop-blur-md lg:p-10">
            <div className="mb-10 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  const isDone = currentStep > stepNumber;

                  return (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black transition-colors ${
                          isDone
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : isActive
                              ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                              : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {stepNumber}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isActive ? "text-slate-800" : isDone ? "text-emerald-700" : "text-slate-500"}`}>
                          {step}
                        </p>
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="mx-3 hidden h-1 w-12 rounded-full bg-slate-100 md:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              {currentStep === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-xs font-black uppercase tracking-widest text-sky-600">Step 1</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-800">Patient Information</h2>
                  
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Patient Full Name</label>
                      <input type="text" placeholder="Enter full name" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Age</label>
                      <input type="number" placeholder="Enter age" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Region / Province</label>
                      <select className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10">
                        <option>Select location</option>
                        <option>National Capital Region</option>
                        <option>Region VII - Central Visayas</option>
                        <option>Region XI - Davao Region</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Contact Number</label>
                      <input type="text" placeholder="09XXXXXXXXX" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-3 block text-sm font-bold text-slate-700">Applicant Type</label>
                      <div className="grid gap-4 md:grid-cols-3">
                        {['Patient', 'Family Member', 'Guardian'].map(type => (
                          <label key={type} className="flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-sky-400 hover:bg-sky-50 hover:shadow-sm">
                            <input type="radio" name="applicantType" className="mr-3 h-5 w-5 cursor-pointer text-sky-600 focus:ring-sky-500" />
                            <span className="font-semibold text-slate-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <button onClick={() => setCurrentStep(2)} className="cursor-pointer rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105">
                      Continue to Next Step
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-xs font-black uppercase tracking-widest text-sky-600">Step 2</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-800">Medical Details</h2>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Diagnosis Type</label>
                      <input type="text" placeholder="Enter diagnosis" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Treatment Facility</label>
                      <input type="text" placeholder="Enter facility name" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Has medical abstract?</label>
                      <select className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Has valid ID?</label>
                      <select className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-colors focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <button onClick={() => setCurrentStep(1)} className="cursor-pointer rounded-full bg-slate-100 px-8 py-4 font-bold text-slate-600 transition-all hover:bg-slate-200">
                      Go Back
                    </button>
                    <button onClick={() => setCurrentStep(3)} className="cursor-pointer rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105">
                      Analyze Eligibility
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <p className="text-xs font-black uppercase tracking-widest text-sky-600">Step 3</p>
                   <h2 className="mt-2 text-3xl font-extrabold text-slate-800">Review Outcome</h2>

                   <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-xl">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                           <p className="text-sm font-bold uppercase tracking-wider text-emerald-100">AI Screening Result</p>
                           <h3 className="mt-2 text-4xl font-black">Eligible & Ready</h3>
                           <p className="mt-3 max-w-lg text-lg text-emerald-50">
                             The patient qualifies for immediate CAF support processing. All initial checks passed.
                           </p>
                        </div>
                      </div>
                   </div>

                   <div className="mt-8 grid gap-6 md:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6">
                         <p className="font-black text-slate-800">Clear for Processing</p>
                         <ul className="mt-4 space-y-3">
                           {['Medical abstract uploaded', 'Approved site location', 'Valid identity verification'].map(i => (
                             <li key={i} className="flex items-center gap-3 font-semibold text-slate-600">
                               <span className="text-emerald-500">✓</span> {i}
                             </li>
                           ))}
                         </ul>
                      </div>
                   </div>

                   <div className="mt-10 flex flex-wrap gap-4">
                     <button onClick={() => setActivePage("application")} className="cursor-pointer rounded-full bg-slate-900 px-8 py-4 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-slate-800">
                       Proceed to Exact Application
                     </button>
                     <button onClick={() => setCurrentStep(1)} className="cursor-pointer rounded-full bg-slate-100 px-8 py-4 font-bold text-slate-600 transition-all hover:bg-slate-200">
                       Restart Checking
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-xl backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600">Fast Assessment</p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-800">Why use this?</h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                The checker saves you days of waiting by ensuring you don't submit forms without the right criteria.
              </p>
            </div>
            
            <div className="rounded-[2rem] border border-emerald-200/50 bg-gradient-to-br from-emerald-100/80 to-sky-100/80 p-8 shadow-xl backdrop-blur-md">
              <h3 className="text-xl font-extrabold text-slate-800">Keep in mind</h3>
              <p className="mt-3 leading-relaxed text-slate-700">
                Final assessment still requires physical document review at the access site.
              </p>
              <button onClick={() => setActivePage("help")} className="mt-6 w-full cursor-pointer rounded-xl bg-white px-5 py-3 font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md">
                Open Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EligibilityPage;