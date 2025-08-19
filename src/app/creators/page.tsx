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

export default function CreatorsPage() {
  const creatorTypes = [
    {
      icon: "📱",
      title: "Social Media Influencers",
      description: "Instagram, TikTok, YouTube, and more",
      examples: ["Lifestyle", "Fashion", "Beauty", "Tech", "Food"],
    },
    {
      icon: "🎥",
      title: "Video Content Creators",
      description: "YouTube, Vimeo, and streaming platforms",
      examples: ["Tutorials", "Entertainment", "Education", "Gaming", "Vlogs"],
    },
    {
      icon: "✍️",
      title: "Bloggers & Writers",
      description: "Blogs, newsletters, and written content",
      examples: ["Travel", "Business", "Health", "Parenting", "Technology"],
    },
    {
      icon: "🎨",
      title: "Artists & Designers",
      description: "Visual arts, graphic design, and illustration",
      examples: [
        "Digital Art",
        "Illustration",
        "Photography",
        "UI/UX",
        "Branding",
      ],
    },
    {
      icon: "🎵",
      title: "Musicians & Podcasters",
      description: "Music, podcasts, and audio content",
      examples: [
        "Music Production",
        "Podcasting",
        "Sound Design",
        "Voice Acting",
      ],
    },
    {
      icon: "💼",
      title: "Business & Professional",
      description: "Thought leadership and industry expertise",
      examples: ["Consulting", "Coaching", "Speaking", "Training", "Mentoring"],
    },
  ];

  const successStories = [
    {
      name: "Emma Chen",
      platform: "Instagram & TikTok",
      followers: "250K+",
      story:
        "Started with 5K followers, now earns $15K/month through brand partnerships",
      avatar: "👩‍🎨",
      niche: "Lifestyle & Fashion",
    },
    {
      name: "Marcus Johnson",
      platform: "YouTube",
      followers: "500K+",
      story: "Gaming channel grew from hobby to $25K/month business",
      avatar: "👨‍🎮",
      niche: "Gaming & Tech",
    },
    {
      name: "Sarah Williams",
      platform: "Blog & Newsletter",
      followers: "100K+",
      story:
        "Personal finance blog now generates $20K/month through sponsorships",
      avatar: "👩‍💼",
      niche: "Finance & Business",
    },
  ];

  const platformFeatures = [
    {
      icon: "🎯",
      title: "Smart Brand Matching",
      description:
        "AI-powered algorithm connects you with brands that align with your audience and values",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description:
        "Set your own rates and see exactly what brands are willing to pay for your content",
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      description:
        "Track your growth, engagement rates, and campaign performance in real-time",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description:
        "Get paid reliably through our escrow system with payment protection",
    },
    {
      icon: "🤝",
      title: "Direct Communication",
      description:
        "Connect directly with brands through our integrated messaging system",
    },
    {
      icon: "📈",
      title: "Growth Tools",
      description:
        "Access resources, templates, and best practices to grow your audience",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 lg:text-6xl">
            For Creators
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            Turn your passion into profit. Connect with premium brands, build
            authentic partnerships, and grow your audience while earning what
            you deserve.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="gradient" size="xl">
              <Link href="/sign-up">Join as Creator</Link>
            </Button>
            <Button variant="outline" size="xl">
              View Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Creator Types Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              All Creator Types Welcome
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Whether you&apos;re just starting out or already have a massive
              following, we have opportunities for creators of all types and
              sizes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {creatorTypes.map((type, index) => (
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

      {/* Success Stories Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Real creators, real results. See how our platform has transformed
              careers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader className="text-center">
                  <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                    {story.avatar}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {story.name}
                  </CardTitle>
                  <CardDescription className="font-medium text-emerald-600">
                    {story.platform} • {story.followers}
                  </CardDescription>
                  <Badge variant="outline" className="mx-auto w-fit">
                    {story.niche}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="leading-relaxed text-gray-600">{story.story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Our platform is built specifically for creators, with tools and
              features designed to help you grow and monetize your content.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature, index) => (
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

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Getting started is simple. Follow these steps to begin monetizing
              your content.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description:
                  "Set up your creator profile with your niche, audience demographics, and portfolio",
              },
              {
                step: "2",
                title: "Get Matched",
                description:
                  "Our AI matches you with brands that align with your audience and values",
              },
              {
                step: "3",
                title: "Collaborate",
                description:
                  "Work directly with brands to create authentic, engaging content",
              },
              {
                step: "4",
                title: "Get Paid",
                description:
                  "Receive secure payments through our platform with full payment protection",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-2xl font-bold text-white">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Start Your Creator Journey?
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-emerald-100">
            Join thousands of creators who are already building successful
            careers through authentic brand partnerships.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl">
              <Link href="/sign-up">Create Your Profile</Link>
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
