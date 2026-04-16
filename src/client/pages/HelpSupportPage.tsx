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

type HelpSupportPageProps = {
  setActivePage: (page: PageKey) => void;
};

const faqItems = [
  {
    question: "Who can apply for assistance through CAF Access Navigator?",
    answer:
      "Patients, family members, guardians, or authorized representatives may use the platform to check eligibility, prepare documents, and submit an application.",
  },
  {
    question: "What if I am not sure which access site to choose?",
    answer:
      "You may use the access sites directory to compare locations and services, or contact support for help choosing the correct site or office.",
  },
  {
    question: "Can I save my application and continue later?",
    answer:
      "Yes. The platform is designed to support draft saving so patients and guardians can return later to complete the form.",
  },
  {
    question: "How will I know if documents are missing?",
    answer:
      "The system shows document status markers and also provides updates through the in-system notifications center when action is needed.",
  },
  {
    question: "What if I cannot complete the process by myself?",
    answer:
      "A guardian or family member may assist the patient in creating an account, preparing documents, and submitting the application.",
  },
];

const guideSteps = [
  "Check the patient’s possible eligibility using the guided screening form.",
  "Review the required document checklist and prepare the needed files.",
  "Complete the patient intake form and select the correct access site.",
  "Submit the application and monitor progress through the tracker and notifications center.",
];

function HelpSupportPage({ setActivePage }: HelpSupportPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-slate-800">Help and Support</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Find answers, follow the step-by-step application guide, and connect with support
              channels for patients, guardians, and coordinators.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage("eligibility")}
              className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
            >
              Check Eligibility
            </button>
            <button
              onClick={() => setActivePage("application")}
              className="cursor-pointer rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Start Application
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-sky-700">Step-by-Step Guide</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">
                How patients and families can use the system
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                The process is designed to be clear and manageable even for first-time users.
              </p>

              <div className="mt-8 grid gap-4">
                {guideSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-lg font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Step {index + 1}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Frequently Asked Questions</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Common questions</h2>

              <div className="mt-6 space-y-4">
                {faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">{item.question}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-violet-700">Contact Support</p>
                <h3 className="mt-2 text-xl font-bold text-slate-800">Helpdesk options</h3>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Hotline
                    </p>
                    <p className="mt-2 text-sm text-slate-700">Available during office hours</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Notifications Center
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      Check for real-time alerts and case status update messages
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Office Helpdesk
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      Access site coordinators and social service support
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-amber-700">Support Tips</p>
                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  Before contacting the helpdesk
                </h3>

                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  <li className="rounded-2xl bg-slate-50 px-4 py-3">
                    Prepare the application reference or case details if available
                  </li>
                  <li className="rounded-2xl bg-slate-50 px-4 py-3">
                    Check the notifications center for recent reminders
                  </li>
                  <li className="rounded-2xl bg-slate-50 px-4 py-3">
                    Review the document checklist before asking about requirements
                  </li>
                  <li className="rounded-2xl bg-slate-50 px-4 py-3">
                    Ensure your account email is active for any critical alerts
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 p-8 ring-1 ring-sky-200">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Need to continue?</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    Return to the application flow anytime
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
                    Patients and guardians can go back to eligibility checking, document review,
                    application submission, or case tracking whenever needed.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActivePage("documents")}
                    className="cursor-pointer rounded-2xl bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    View Documents
                  </button>
                  <button
                    onClick={() => setActivePage("tracker")}
                    className="cursor-pointer rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
                  >
                    Track Case
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-sky-700">Quick Access</p>
              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => setActivePage("login")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                >
                  Patient Registration / Login
                </button>
                <button
                  onClick={() => setActivePage("notifications")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                >
                  Notifications Center
                </button>
                <button
                  onClick={() => setActivePage("sites")}
                  className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                >
                  Access Sites Directory
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-emerald-700">Patient-friendly reminders</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Use step-by-step pages instead of completing everything at once
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Ask a family member or guardian for assistance if needed
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  Review support messages carefully before resubmitting files
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-100 to-sky-100 p-6 ring-1 ring-emerald-200">
              <p className="text-sm font-semibold text-slate-700">Need dashboard access?</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">Staff and admin pages</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Coordinators and administrators can also access dashboard views for case
                management, monitoring, and reporting.
              </p>

              <div className="mt-5 grid gap-3">
                <button
                  onClick={() => setActivePage("staff")}
                  className="cursor-pointer rounded-2xl bg-white px-4 py-3 font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Open Staff Dashboard
                </button>
                <button
                  onClick={() => setActivePage("admin")}
                  className="cursor-pointer rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  Open Admin Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpSupportPage;



