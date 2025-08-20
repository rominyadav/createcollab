"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SuccessMetricsSection() {
  const successMetrics = [
    {
      metric: "Average 3.2x",
      description: "ROI increase for brands using our platform",
      icon: "📈",
    },
    {
      metric: "89%",
      description: "of brands report improved brand awareness",
      icon: "🎯",
    },
    {
      metric: "2.8x",
      description: "higher engagement rates compared to traditional ads",
      icon: "💬",
    },
    {
      metric: "67%",
      description: "reduction in customer acquisition costs",
      icon: "💰",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Proven Results
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Our platform delivers measurable results that impact your bottom
            line.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {successMetrics.map((metric, index) => (
            <Card
              key={index}
              className="group border-0 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader>
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {metric.icon}
                </div>
                <div className="mb-2 text-3xl font-bold text-slate-600">
                  {metric.metric}
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-600">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
