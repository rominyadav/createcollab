"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CampaignTypesSection() {
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

  return (
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
  );
}
