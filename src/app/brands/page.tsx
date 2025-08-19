"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";

export default function BrandsPage() {
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

  const campaignTypes = [
    {
      icon: "📱",
      title: "Social Media Campaigns",
      description: "Instagram, TikTok, YouTube, and other social platforms",
      metrics: ["Reach", "Engagement", "Conversions", "Brand Awareness"],
    },
    {
      icon: "🎥",
      title: "Video Content",
      description: "YouTube videos, TikTok content, and video marketing",
      metrics: ["Views", "Watch Time", "Subscriptions", "Brand Recall"],
    },
    {
      icon: "✍️",
      title: "Content Marketing",
      description: "Blog posts, articles, and thought leadership content",
      metrics: ["Traffic", "Leads", "SEO Rankings", "Authority Building"],
    },
    {
      icon: "🎨",
      title: "Visual & Design",
      description: "Graphic design, illustrations, and visual content",
      metrics: [
        "Brand Recognition",
        "Visual Appeal",
        "Consistency",
        "Memorability",
      ],
    },
    {
      icon: "🎵",
      title: "Audio & Podcasts",
      description: "Podcast sponsorships and audio content",
      metrics: [
        "Listeners",
        "Downloads",
        "Brand Mentions",
        "Audience Engagement",
      ],
    },
    {
      icon: "🤝",
      title: "Influencer Partnerships",
      description: "Long-term partnerships with key influencers",
      metrics: [
        "Relationship Building",
        "Authenticity",
        "Loyalty",
        "Long-term Value",
      ],
    },
  ];

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 lg:text-6xl">
            For Brands
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            Scale your marketing with authentic creator partnerships. Access
            verified creators, track campaign performance, and grow your reach
            with data-driven insights.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="gradient" size="xl">
              <Link href="/sign-up">Start Your Campaign</Link>
            </Button>
            <Button variant="outline" size="xl">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Types Section */}
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

      {/* Campaign Types Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Campaign Types We Support
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              From social media campaigns to long-term partnerships, we offer
              flexible solutions for every marketing need.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {campaignTypes.map((campaign, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                    {campaign.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {campaign.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {campaign.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">
                      Key Metrics:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.metrics.map((metric, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
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

      {/* How It Works Section */}
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
            {[
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
            ].map((step, index) => (
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

      {/* Platform Features Section */}
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
            {[
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
            ].map((feature, index) => (
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-600 to-slate-800 py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Scale Your Marketing?
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-slate-200">
            Join thousands of brands that are already seeing results through
            authentic creator partnerships.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl">
              Start Your Campaign
            </Button>
            <Button variant="heroOutline" size="xl">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
