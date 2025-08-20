"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlatformFeaturesSection() {
  const features = [
    {
      icon: "🎯",
      title: "AI-Powered Matching",
      description:
        "Our algorithm finds creators whose audiences perfectly match your target demographics",
    },
    {
      icon: "📊",
      title: "Real-Time Analytics",
      description:
        "Track campaign performance, ROI, and engagement metrics in real-time",
    },
    {
      icon: "💳",
      title: "Secure Payment System",
      description:
        "Built-in escrow ensures creators deliver before payment is released",
    },
    {
      icon: "🤝",
      title: "Direct Communication",
      description:
        "Built-in messaging and project management tools streamline collaboration",
    },
    {
      icon: "📈",
      title: "Campaign Management",
      description:
        "Manage multiple campaigns, creators, and content from one dashboard",
    },
    {
      icon: "🔒",
      title: "Quality Assurance",
      description:
        "All creators are verified and vetted for professional quality",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Powerful Tools for Brands
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Everything you need to manage successful creator partnerships at
            scale.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader>
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
