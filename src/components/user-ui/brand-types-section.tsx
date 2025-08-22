"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BrandTypesSection() {
  const brandTypes = [
    {
      icon: "🏢",
      title: "Enterprise Brands",
      description: "Large corporations and established companies",
      examples: [
        "Fortune 500",
        "Global Brands",
        "Industry Leaders",
        "Public Companies",
      ],
    },
    {
      icon: "🚀",
      title: "Startups & Scale-ups",
      description: "Fast-growing companies and innovative startups",
      examples: [
        "Tech Startups",
        "E-commerce",
        "SaaS",
        "Fintech",
        "Healthtech",
      ],
    },
    {
      icon: "🛍️",
      title: "E-commerce & Retail",
      description: "Online stores and retail businesses",
      examples: [
        "Fashion",
        "Beauty",
        "Home & Garden",
        "Electronics",
        "Food & Beverage",
      ],
    },
    {
      icon: "💼",
      title: "B2B & Services",
      description: "Business-to-business and service providers",
      examples: [
        "Consulting",
        "Software",
        "Marketing",
        "Legal",
        "Financial Services",
      ],
    },
    {
      icon: "🏥",
      title: "Healthcare & Wellness",
      description: "Health, fitness, and wellness brands",
      examples: [
        "Fitness",
        "Nutrition",
        "Mental Health",
        "Medical",
        "Wellness",
      ],
    },
    {
      icon: "🎓",
      title: "Education & Training",
      description: "Educational institutions and training providers",
      examples: [
        "Universities",
        "Online Courses",
        "Training Programs",
        "EdTech",
        "Certifications",
      ],
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            All Brand Types Welcome
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Whether you&apos;re a startup or enterprise, we have creator
            partnerships that fit your brand and budget.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {brandTypes.map((type, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader className="text-center">
                <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                  {type.icon}
                </div>
                <CardTitle className="text-xl font-semibold">
                  {type.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-2">
                  {type.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
