"use client";

import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface TimelineStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface JourneyTimelineProps {
  className?: string;
}

export function JourneyTimeline({ className }: JourneyTimelineProps) {
  const [animatedSteps, setAnimatedSteps] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const creatorSteps: TimelineStep[] = [
    {
      step: 1,
      title: "Join Platform",
      description: "Create your creator profile and showcase your content",
      icon: "👤",
      color: "from-emerald-500 to-teal-600",
    },
    {
      step: 2,
      title: "Join Campaigns",
      description: "Browse and apply to brand campaigns that match your niche",
      icon: "🎯",
      color: "from-teal-500 to-cyan-600",
    },
    {
      step: 3,
      title: "Upload Content",
      description: "Create and submit authentic content for brand partnerships",
      icon: "📤",
      color: "from-cyan-500 to-blue-600",
    },
    {
      step: 4,
      title: "Get Paid",
      description: "Receive secure payments through our escrow system",
      icon: "💰",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  const brandSteps: TimelineStep[] = [
    {
      step: 1,
      title: "Join Platform",
      description: "Set up your brand profile and define your target audience",
      icon: "🏢",
      color: "from-orange-500 to-red-600",
    },
    {
      step: 2,
      title: "Create Campaign",
      description: "Design campaigns with clear goals and creative briefs",
      icon: "🚀",
      color: "from-red-500 to-pink-600",
    },
    {
      step: 3,
      title: "Receive Videos",
      description: "Get authentic content from verified creators",
      icon: "📹",
      color: "from-pink-500 to-purple-600",
    },
    {
      step: 4,
      title: "Grow Business",
      description: "Scale your marketing with proven creator partnerships",
      icon: "📈",
      color: "from-purple-500 to-violet-600",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(
              entry.target.getAttribute("data-step") || "0"
            );
            if (step > 0) {
              setAnimatedSteps((prev) => new Set(prev).add(step));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (timelineRef.current) {
      const steps = timelineRef.current.querySelectorAll("[data-step]");
      steps.forEach((step) => observer.observe(step));
    }

    return () => observer.disconnect();
  }, []);

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
    <div className={cn("relative py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Two parallel journeys, one powerful platform. See how creators and
            brands work together to create authentic, results-driven
            partnerships.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Center Timeline Line - Shorter and positioned properly */}
          <div className="absolute top-20 bottom-20 left-1/2 w-1 -translate-x-px transform overflow-hidden bg-gray-200">
            <div
              className="w-full bg-gradient-to-b from-emerald-500 via-blue-500 to-orange-500 transition-all duration-1000 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
                transform: `translateY(${(1 - scrollProgress) * 100}%)`,
              }}
            />
          </div>

          {/* Center Icon - Positioned in the middle of the timeline */}
          <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg">
              <span className="text-2xl">🤝</span>
            </div>
          </div>

          {/* Creator Journey (Left Side) */}
          <div className="space-y-16">
            {creatorSteps.map((step) => (
              <div
                key={`creator-${step.step}`}
                data-step={step.step}
                className="relative flex items-center"
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    "absolute left-1/2 h-6 w-6 -translate-x-1/2 transform rounded-full border-4 border-white shadow-lg transition-all duration-700",
                    animatedSteps.has(step.step)
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${step.color})`,
                  }}
                />

                {/* Content */}
                <div className="w-5/12 pr-12 text-right">
                  <div
                    className={cn(
                      "rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-700",
                      animatedSteps.has(step.step)
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    )}
                  >
                    <div className="mb-4 flex items-center justify-end gap-4">
                      <Badge
                        variant="secondary"
                        className="text-sm font-semibold"
                        style={{
                          background: `linear-gradient(135deg, ${step.color})`,
                          color: "white",
                        }}
                      >
                        Step {step.step}
                      </Badge>
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-500",
                          animatedSteps.has(step.step) ? "scale-100" : "scale-0"
                        )}
                        style={{
                          background: `linear-gradient(135deg, ${step.color})`,
                        }}
                      >
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Brand Journey (Right Side) - Positioned to be parallel */}
          <div className="mt-16 space-y-16">
            {brandSteps.map((step) => (
              <div
                key={`brand-${step.step}`}
                data-step={step.step + 10} // Different step numbers to avoid conflicts
                className="relative flex items-center"
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    "absolute left-1/2 h-6 w-6 -translate-x-1/2 transform rounded-full border-4 border-white shadow-lg transition-all duration-700",
                    animatedSteps.has(step.step + 10)
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${step.color})`,
                  }}
                />

                {/* Content */}
                <div className="ml-auto w-5/12 pl-12 text-left">
                  <div
                    className={cn(
                      "rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-700",
                      animatedSteps.has(step.step + 10)
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    )}
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-500",
                          animatedSteps.has(step.step + 10)
                            ? "scale-100"
                            : "scale-0"
                        )}
                        style={{
                          background: `linear-gradient(135deg, ${step.color})`,
                        }}
                      >
                        {step.icon}
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-sm font-semibold"
                        style={{
                          background: `linear-gradient(135deg, ${step.color})`,
                          color: "white",
                        }}
                      >
                        Step {step.step}
                      </Badge>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
