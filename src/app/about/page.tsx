"use client";

import { useEffect, useRef, useState } from "react";

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
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "Former VP of Marketing at TechCorp, passionate about empowering creators and building authentic brand partnerships.",
      avatar: "👩‍💼",
      linkedin: "#",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      bio: "Ex-Google engineer with 15+ years building scalable platforms. Loves solving complex technical challenges.",
      avatar: "👨‍💻",
      linkedin: "#",
    },
    {
      name: "Aisha Patel",
      role: "Head of Creator Relations",
      bio: "Former content creator with 2M+ followers. Understands the creator journey from personal experience.",
      avatar: "👩‍🎨",
      linkedin: "#",
    },
    {
      name: "David Kim",
      role: "VP of Business Development",
      bio: "Strategic partnerships expert who's helped scale multiple startups from seed to unicorn status.",
      avatar: "👨‍💼",
      linkedin: "#",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description:
        "Started with a vision to democratize brand-creator partnerships",
    },
    {
      year: "2021",
      title: "First 100 Creators",
      description: "Reached our first milestone of verified creators",
    },
    {
      year: "2022",
      title: "Series A",
      description: "Raised $15M to scale our platform and team",
    },
    {
      year: "2023",
      title: "10K+ Brands",
      description: "Connected thousands of brands with creators worldwide",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Launched in 15+ countries across 3 continents",
    },
    {
      year: "2025",
      title: "Future",
      description: "Continuing to innovate and expand the creator economy",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const timelineHeight = rect.height;
        const scrollTop = window.pageYOffset;
        const timelineTop = rect.top + scrollTop;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress through the timeline
        const progress = Math.max(
          0,
          Math.min(
            1,
            (scrollTop + viewportHeight - timelineTop) /
              (timelineHeight + viewportHeight)
          )
        );

        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 lg:text-6xl">
            About CreateCollab
          </h1>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            We&apos;re on a mission to democratize the creator economy, making
            it easier for brands and creators to build authentic, profitable
            partnerships that drive real results.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-4xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                The creator economy is worth over $100 billion, yet many
                talented creators struggle to monetize their content while
                brands miss out on authentic partnerships. We&apos;re here to
                change that.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                By leveraging AI-powered matching, transparent pricing, and
                streamlined workflows, we&apos;re building the most trusted
                platform for brand-creator collaborations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  AI-Powered Matching
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  Transparent Pricing
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  Global Reach
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  Trusted Platform
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-slate-600 to-slate-800 p-8 text-white">
                <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
                <p className="text-lg leading-relaxed text-slate-200">
                  A world where every creator can build a sustainable career
                  doing what they love, and every brand can access authentic
                  voices that resonate with their audience.
                </p>
              </div>
              <div className="absolute -top-6 -right-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400 text-4xl">
                🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Our Values
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🤝",
                title: "Authenticity",
                description:
                  "We believe in genuine partnerships that benefit both parties. No fake engagement, no inflated metrics.",
              },
              {
                icon: "💡",
                title: "Innovation",
                description:
                  "Constantly pushing boundaries with AI, automation, and creative solutions to solve real problems.",
              },
              {
                icon: "🌍",
                title: "Inclusivity",
                description:
                  "Making the creator economy accessible to creators of all backgrounds, sizes, and niches.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="border-0 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="mb-4 text-5xl">{value.icon}</div>
                  <CardTitle className="text-xl font-semibold">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              The passionate people behind CreateCollab
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group border-0 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                    {member.avatar}
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="font-medium text-slate-600">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {member.bio}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Connect on LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Our Journey
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Key milestones in our company&apos;s growth
            </p>
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Timeline line - Animated */}
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-px transform overflow-hidden bg-gray-200">
              <div
                className="w-full bg-gradient-to-b from-slate-600 to-slate-800 transition-all duration-1000 ease-out"
                style={{
                  height: `${scrollProgress * 100}%`,
                  transform: `translateY(${(1 - scrollProgress) * 100}%)`,
                }}
              />
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full border-4 border-white bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg"></div>

                  {/* Content */}
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
                      <div className="mb-2 text-2xl font-bold text-slate-600">
                        {milestone.year}
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-600 to-slate-800 py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold">
            Join Us in Shaping the Future
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-slate-200">
            Whether you&apos;re a creator looking to monetize your passion or a
            brand seeking authentic partnerships, we&apos;re here to help you
            succeed.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl">
              Get Started Today
            </Button>
            <Button variant="heroOutline" size="xl">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
