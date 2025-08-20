"use client";

import { useEffect, useState } from "react";

import { StatsCard } from "@/components/user-ui/stats-card";

interface StatsSectionProps {
  animatedElements: Set<string>;
}

interface StatItem {
  id: string;
  number: string;
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatsSection({ animatedElements }: StatsSectionProps) {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats: StatItem[] = [
    {
      id: "creators",
      number: "50K+",
      target: 50,
      suffix: "K+",
      label: "Active Creators",
      icon: "👥",
      trend: { value: "+12%", isPositive: true },
    },
    {
      id: "brands",
      number: "2K+",
      target: 2,
      suffix: "K+",
      label: "Partner Brands",
      icon: "🏢",
      trend: { value: "+8%", isPositive: true },
    },
    {
      id: "earnings",
      number: "$5M+",
      target: 5,
      prefix: "$",
      suffix: "M+",
      label: "Creator Earnings",
      icon: "💰",
      trend: { value: "+25%", isPositive: true },
    },
    {
      id: "success",
      number: "95%",
      target: 95,
      suffix: "%",
      label: "Success Rate",
      icon: "🎯",
      trend: { value: "+3%", isPositive: true },
    },
  ];

  useEffect(() => {
    if (hasAnimated) return;

    const animateCounters = () => {
      const newCounters: { [key: string]: number } = {};

      stats.forEach((stat) => {
        newCounters[stat.id] = 0;
      });

      setCounters(newCounters);

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;

        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Smooth easing

        const newCounters: { [key: string]: number } = {};

        stats.forEach((stat) => {
          const currentValue = Math.floor(stat.target * easeOutQuart);
          newCounters[stat.id] = currentValue;
        });

        setCounters(newCounters);

        if (currentStep >= steps) {
          clearInterval(timer);
          setHasAnimated(true);

          // Set final values
          const finalCounters: { [key: string]: number } = {};
          stats.forEach((stat) => {
            finalCounters[stat.id] = stat.target;
          });
          setCounters(finalCounters);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    // Start animation when component mounts
    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, [hasAnimated, stats]);

  const formatNumber = (stat: StatItem, value: number) => {
    if (stat.prefix && stat.suffix) {
      return `${stat.prefix}${value}${stat.suffix}`;
    } else if (stat.prefix) {
      return `${stat.prefix}${value}`;
    } else if (stat.suffix) {
      return `${value}${stat.suffix}`;
    }
    return value.toString();
  };

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
              key={stat.id}
              number={formatNumber(stat, counters[stat.id] || 0)}
              label={stat.label}
              icon={stat.icon}
              trend={stat.trend}
              data-animate-id={`stat-${index}`}
              style={{
                opacity: animatedElements.has(`stat-${index}`) ? 1 : 1,
                transform: animatedElements.has(`stat-${index}`)
                  ? "translateY(0) scale(1)"
                  : "translateY(0) scale(0.95)",
                transition: `all 0.6s ease-out ${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
