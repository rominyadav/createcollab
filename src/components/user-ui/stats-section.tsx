"use client";

import { StatsCard } from "@/components/user-ui/stats-card";

interface StatsSectionProps {
  animatedElements: Set<string>;
}

export default function StatsSection({ animatedElements }: StatsSectionProps) {
  const stats = [
    {
      number: "50K+",
      label: "Active Creators",
      icon: "👥",
      trend: { value: "+12%", isPositive: true },
    },
    {
      number: "2K+",
      label: "Partner Brands",
      icon: "🏢",
      trend: { value: "+8%", isPositive: true },
    },
    {
      number: "$5M+",
      label: "Creator Earnings",
      icon: "💰",
      trend: { value: "+25%", isPositive: true },
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: "🎯",
      trend: { value: "+3%", isPositive: true },
    },
  ];

  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-24 text-white"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            className="mb-6 text-4xl font-bold transition-colors duration-500 lg:text-5xl"
            data-animate-id="stats-title"
            style={{
              opacity: animatedElements.has("stats-title") ? 1 : 0,
              transform: animatedElements.has("stats-title")
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 0.8s ease-out",
            }}
          >
            Our Impact in Numbers
          </h2>
          <p
            className="mx-auto max-w-3xl text-xl text-slate-300 transition-colors duration-500"
            data-animate-id="stats-subtitle"
            style={{
              opacity: animatedElements.has("stats-subtitle") ? 1 : 0,
              transform: animatedElements.has("stats-subtitle")
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
            }}
          >
            See how we&apos;re transforming the creator economy
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              trend={stat.trend}
              data-animate-id={`stat-${index}`}
              style={{
                opacity: animatedElements.has(`stat-${index}`) ? 1 : 0,
                transform: animatedElements.has(`stat-${index}`)
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: `all 0.8s ease-out ${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
