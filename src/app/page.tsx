"use client";

import { useEffect, useState } from "react";

import { Navigation } from "@/components/ui/navigation";
import FeaturesSection from "@/components/user-ui/features-section";
import HomeFooter from "@/components/user-ui/home-footer";
import HomeHero from "@/components/user-ui/home-hero";
import { JourneyTimeline } from "@/components/user-ui/journey-timeline";
import StatsSection from "@/components/user-ui/stats-section";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    setIsMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Update active section based on scroll position
      if (currentScrollY < window.innerHeight * 0.5) {
        setActiveSection("home");
      } else if (currentScrollY < window.innerHeight * 1.5) {
        setActiveSection("features");
      } else if (currentScrollY < window.innerHeight * 2.5) {
        setActiveSection("stats");
      } else {
        setActiveSection("footer");
      }
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute("data-animate-id");
          if (elementId) {
            setAnimatedElements((prev) => new Set(prev).add(elementId));
          }
        }
      });
    }, observerOptions);

    // Observe all elements with data-animate-id
    if (typeof document !== "undefined") {
      document.querySelectorAll("[data-animate-id]").forEach((el) => {
        observer.observe(el);
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-slate-600 to-slate-800 transition-all duration-100"
        style={{
          width:
            isMounted &&
            typeof window !== "undefined" &&
            typeof document !== "undefined"
              ? `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
              : "0%",
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HomeHero scrollY={scrollY} />

      {/* Features Section */}
      <FeaturesSection scrollY={scrollY} animatedElements={animatedElements} />

      {/* Journey Timeline Section */}
      <section className="bg-white py-24">
        <JourneyTimeline />
      </section>

      {/* Stats Section */}
      <StatsSection animatedElements={animatedElements} />

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}
