"use client";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Define Your Campaign",
      description:
        "Set your goals, target audience, and budget for the campaign",
    },
    {
      step: "2",
      title: "Get Matched",
      description:
        "Our AI matches you with creators whose audiences align with your target market",
    },
    {
      step: "3",
      title: "Collaborate & Create",
      description:
        "Work with creators to develop authentic content that resonates with their audience",
    },
    {
      step: "4",
      title: "Measure & Optimize",
      description:
        "Track performance in real-time and optimize campaigns for better results",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Getting started with creator partnerships is simple and efficient.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-slate-600 to-slate-800 text-2xl font-bold text-white">
                {step.step}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
