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

type ApplicationPageProps = {
  setActivePage: (page: PageKey) => void;
};

function ApplicationPage({ setActivePage }: ApplicationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Personal Details",
    "Diagnosis Details",
    "Access Site & Contact",
    "Review & Submit",
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-sky-50/50 to-emerald-50/50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button onClick={() => setActivePage("landing")}
              className="text-sm font-medium text-sky-700 hover:text-sky-800"
            >
              â†?Back to Home
            </button>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">
              Patient Intake / Application Form
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Complete the guided intake form for CAF assistance. The process is divided into clear
              steps so patients and guardians can submit information with less confusion.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => setActivePage("documents")}
              className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Review Documents
            </button>
            <button onClick={() => setActivePage("tracker")}
              className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Track Application
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl bg-white/80 backdrop-blur-md p-8 lg:p-10 shadow-sm border border-white/60 shadow-lg">
            <div className="mb-8 flex flex-wrap items-center gap-3">
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
                    <p
                      className={`text-sm font-semibold ${
                        isActive ? "text-sky-700" : "text-slate-700"
                      }`}
                    >
                      {step}
                    </p>
                    {index !== steps.length - 1 && (
                      <div className="mx-2 hidden h-1 w-10 rounded-full bg-slate-200 md:block" />
                    )}
                  </div>
                );
              })}
            </div>

            {currentStep === 1 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 1</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Personal Details</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Enter the patient and applicant information exactly as it appears on official
                  documents.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Patient Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter patient full name"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Sex</label>
                    <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>Select sex</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Civil Status
                    </label>
                    <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>Select status</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Widowed</option>
                      <option>Separated</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Home Address
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Enter complete home address"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Applicant / Representative Name
                    </label>
                    <input
                      type="text"
                      placeholder="If different from patient"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Relationship to Patient
                    </label>
                    <input
                      type="text"
                      placeholder="Parent, guardian, sibling, etc."
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Save Draft
                  </button>
                  <button onClick={() => setCurrentStep(2)}
                    className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 2</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Diagnosis Details</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Provide the medical and treatment details needed for the initial review.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      placeholder="Enter diagnosis"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date of Diagnosis
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Treating Hospital / Facility
                    </label>
                    <input
                      type="text"
                      placeholder="Enter hospital or clinic"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Attending Physician
                    </label>
                    <input
                      type="text"
                      placeholder="Enter physician name"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Treatment Notes / Assistance Needed
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe treatment need, medicines, procedure, or support required"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
                    Make sure that the diagnosis and treatment information matches the uploaded
                    medical abstract and supporting documents.
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setCurrentStep(1)}
                    className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                    >
                      Save Draft
                    </button>
                    <button onClick={() => setCurrentStep(3)}
                      className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 3</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Access Site & Contact</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Select the most appropriate access site and enter contact details for case
                  coordination and SMS updates.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Selected Access Site
                    </label>
                    <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>Select access site</option>
                      <option>Jose R. Reyes Memorial Medical Center</option>
                      <option>East Avenue Medical Center</option>
                      <option>Philippine General Hospital</option>
                      <option>Southern Philippines Medical Center</option>
                      <option>Vicente Sotto Memorial Medical Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Preferred Contact Method
                    </label>
                    <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
                      <option>Select method</option>
                      <option>SMS</option>
                      <option>Phone Call</option>
                      <option>Email</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Mobile Number for Updates
                    </label>
                    <input
                      type="text"
                      placeholder="09XXXXXXXXX"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Additional Coordination Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Optional notes for staff or coordinator"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2 grid gap-3 md:grid-cols-2">
                    <label className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" />
                      I agree to receive SMS reminders and case status updates.
                    </label>
                    <label className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" />
                      I confirm the selected access site is the correct office for this case.
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setCurrentStep(2)}
                    className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                    >
                      Save Draft
                    </button>
                    <button onClick={() => setCurrentStep(4)}
                      className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
                    >
                      Review Summary
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <p className="text-sm font-semibold text-sky-700">Step 4</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Review & Submit</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Review the information below before final submission to the selected access site.
                </p>

                <div className="mt-6 grid gap-5">
                  <div className="rounded-3xl bg-slate-50 p-6 border border-white/60 shadow-lg">
                    <h3 className="text-lg font-semibold text-slate-800">Applicant Summary</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Patient Name
                        </p>
                        <p className="mt-2 font-semibold text-slate-800">Juan Dela Cruz</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Diagnosis
                        </p>
                        <p className="mt-2 font-semibold text-slate-800">For review</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Access Site
                        </p>
                        <p className="mt-2 font-semibold text-slate-800">
                          Jose R. Reyes Memorial Medical Center
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          SMS Updates
                        </p>
                        <p className="mt-2 font-semibold text-emerald-700">Enabled</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-emerald-50 p-6 border border-white/60 shadow-lg">
                    <h3 className="text-lg font-semibold text-emerald-800">Ready for submission</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Once submitted, the application will enter the review process. The patient or
                      guardian may then track the case status, receive reminders for missing
                      documents, and wait for updates from the selected site coordinator.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-200">
                    <h3 className="text-lg font-semibold text-amber-800">Before submitting</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      <li className="rounded-2xl bg-white px-4 py-3">
                        Confirm the uploaded documents are complete and readable
                      </li>
                      <li className="rounded-2xl bg-white px-4 py-3">
                        Make sure contact information is active for follow-up
                      </li>
                      <li className="rounded-2xl bg-white px-4 py-3">
                        Verify the selected access site or hospital office
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => setCurrentStep(3)}
                    className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Save Draft
                  </button>
                  <button onClick={() => setActivePage("tracker")}
                    className="cursor-pointer shadow-md transition-all hover:scale-[1.02] hover:shadow-lg rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-sky-700">Application Tips</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Make submission easier and faster
              </h3>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Prepare documents before completing the final step
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Use an active mobile number for SMS reminders
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Review every section before submitting to avoid delays
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-6 border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-slate-700">Need guidance?</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">
                Patients and guardians can ask for help
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                The help center provides FAQs, step-by-step guidance, and office contact support for
                applicants who may not be familiar with the process.
              </p>

              <button onClick={() => setActivePage("help")}
                className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Open Help & Support
              </button>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-white/60 shadow-lg">
              <p className="text-sm font-semibold text-emerald-700">Quick Links</p>
              <div className="mt-4 grid gap-3">
                <button onClick={() => setActivePage("sites")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Access Sites Directory
                </button>
                <button onClick={() => setActivePage("documents")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Document Requirements Guide
                </button>
                <button onClick={() => setActivePage("notifications")}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                >
                  Notifications Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;

