"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselItem } from "@/components/user-ui/carousel";
import { JourneyTimeline } from "@/components/user-ui/journey-timeline";
import { StatsCard } from "@/components/user-ui/stats-card";
import { VideoCollage } from "@/components/user-ui/video-collage";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

  const scrollToSection = (sectionId: string) => {
    if (typeof document === "undefined") return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: "🤝",
      title: "Smart Matching",
      description:
        "Our AI-powered algorithm connects brands with the perfect creators based on audience alignment, engagement rates, and brand values for maximum campaign success.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description:
        "All creators are verified and vetted to ensure professional quality content. Brands get access to top-tier talent, while creators work with legitimate businesses.",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: "📊",
      title: "Real-Time Analytics",
      description:
        "Track campaign performance with detailed analytics. Monitor reach, engagement, conversions, and ROI in real-time to optimize your marketing strategy.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description:
        "Built-in escrow system ensures creators get paid fairly and on time, while brands have payment protection until deliverables are met.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: "⚡",
      title: "Fast Collaboration",
      description:
        "Streamlined workflow tools, integrated messaging, and project management features make collaboration smooth and efficient for everyone.",
      color: "from-indigo-500 to-violet-600",
    },
    {
      icon: "🎯",
      title: "Targeted Reach",
      description:
        "Advanced targeting options help brands find creators whose audiences match their ideal customer demographics and interests.",
      color: "from-violet-500 to-purple-600",
    },
  ];

  const videoData = [
    {
      aspect: "16:9",
      title: "Brand Campaign",
      subtitle: "Tech Product Launch",
      videoSrc: "/videoLayout/1.mp4",
    },
    {
      aspect: "9:16",
      title: "Creator Story",
      subtitle: "Behind the Scenes",
      vertical: true,
      videoSrc: "/videoLayout/2.mp4",
    },
    {
      aspect: "16:9",
      title: "Collaboration",
      subtitle: "Fashion Partnership",
      videoSrc: "/videoLayout/3.mp4",
    },
    {
      aspect: "16:9",
      title: "Success Story",
      subtitle: "Growth Results",
      videoSrc: "/videoLayout/4.mp4",
    },
    {
      aspect: "9:16",
      title: "Creator Review",
      subtitle: "Product Showcase",
      vertical: true,
      videoSrc: "/videoLayout/5.mp4",
    },
  ];

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
      <section
        ref={heroRef}
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-72 w-72 animate-pulse rounded-full bg-white mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-2000 absolute top-40 right-20 h-72 w-72 animate-pulse rounded-full bg-slate-300 mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-4000 absolute -bottom-8 left-40 h-72 w-72 animate-pulse rounded-full bg-slate-400 mix-blend-multiply blur-xl filter"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div
              className="space-y-8 text-white"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                opacity: Math.max(0, 1 - scrollY * 0.001),
              }}
            >
              <h1 className="text-5xl leading-tight font-bold lg:text-6xl">
                Where Brands Meet{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Creators
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-slate-200 lg:text-2xl">
                The ultimate platform connecting innovative brands with talented
                creators. Grow your business, monetize your creativity, and
                build authentic partnerships that drive results.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Video Grid */}
            <div
              style={{
                transform: `translateY(${scrollY * 0.2}px) scale(${1 - scrollY * 0.0001})`,
              }}
            >
              <VideoCollage videos={videoData} />
            </div>
          </div>
        </div>
      </section>

      {/* Unified Video Collage + Built for Success Section */}
      <section
        ref={featuresRef}
        id="features"
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-24"
        style={{
          transform: `translateY(${scrollY * 0.15}px) scale(${1 - scrollY * 0.00005})`,
        }}
      >
        {/* Background Video Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="absolute top-0 right-0 h-full w-full"
            style={{
              transform: `translateY(${scrollY * 0.05}px) scale(${1 + scrollY * 0.00002})`,
            }}
          >
            <VideoCollage videos={videoData} />
          </div>
        </div>

        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="mb-16 text-center">
            <h2
              className="mb-6 text-4xl font-bold text-gray-900 transition-colors duration-500 lg:text-5xl"
              data-animate-id="features-title"
              style={{
                opacity: animatedElements.has("features-title") ? 1 : 0,
                transform: animatedElements.has("features-title")
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "all 0.8s ease-out",
              }}
            >
              Built for Success
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl text-gray-600 transition-colors duration-500"
              data-animate-id="features-subtitle"
              style={{
                opacity: animatedElements.has("features-subtitle") ? 1 : 0,
                transform: animatedElements.has("features-subtitle")
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "all 0.8s ease-out 0.2s",
              }}
            >
              Our platform is designed to empower both brands and creators with
              the tools they need to succeed
            </p>
          </div>

          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            {/* For Brands Card */}
            <Card
              className="group relative transform overflow-hidden border-0 bg-gradient-to-br from-slate-600 to-slate-800 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              data-animate-id="brands-card"
              style={{
                opacity: animatedElements.has("brands-card") ? 1 : 0,
                transform: animatedElements.has("brands-card")
                  ? "translateY(0)"
                  : "translateY(50px)",
                transition: "all 0.8s ease-out 0.3s",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600/20 to-slate-800/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <CardHeader className="relative z-10">
                <div className="mb-4 text-4xl">🚀</div>
                <CardTitle className="text-3xl font-bold">For Brands</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="mb-6 text-lg leading-relaxed text-slate-200">
                  Scale your marketing with authentic creator partnerships.
                  Access verified creators, track campaign performance, and grow
                  your reach with data-driven insights.
                </p>
                <Button variant="heroOutline" size="lg" className="w-full">
                  Explore for Brands
                </Button>
              </CardContent>
            </Card>

            {/* For Creators Card */}
            <Card
              className="group relative transform overflow-hidden border-0 bg-gradient-to-br from-emerald-600 to-teal-700 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              data-animate-id="creators-card"
              style={{
                opacity: animatedElements.has("creators-card") ? 1 : 0,
                transform: animatedElements.has("creators-card")
                  ? "translateY(0)"
                  : "translateY(50px)",
                transition: "all 0.8s ease-out 0.4s",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-700/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <CardHeader className="relative z-10">
                <div className="mb-4 text-4xl">💰</div>
                <CardTitle className="text-3xl font-bold">
                  For Creators
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="mb-6 text-lg leading-relaxed text-emerald-100">
                  Monetize your content and build your career. Connect with
                  premium brands, secure fair compensation, and grow your
                  audience with professional opportunities.
                </p>
                <Button variant="heroOutline" size="lg" className="w-full">
                  Join as Creator
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Carousel */}
          <div className="mb-16">
            <h3
              className="mb-12 text-center text-3xl font-bold text-gray-900 transition-colors duration-500"
              data-animate-id="carousel-title"
              style={{
                opacity: animatedElements.has("carousel-title") ? 1 : 0,
                transform: animatedElements.has("carousel-title")
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "all 0.8s ease-out",
              }}
            >
              Why Choose CreateCollab?
            </h3>
            <Carousel
              className="mx-auto max-w-4xl"
              showArrows={true}
              showDots={true}
              autoPlay={true}
              interval={4000}
            >
              {features.map((feature, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 bg-white shadow-2xl">
                    <CardHeader className="pb-4 text-center">
                      <div
                        className={`mb-6 bg-gradient-to-r text-6xl ${feature.color} bg-clip-text text-transparent`}
                      >
                        {feature.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="bg-white py-24">
        <JourneyTimeline />
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
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
            {[
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
            ].map((stat, index) => (
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

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-8 lg:grid-cols-4">
            <div>
              <div className="mb-4 bg-gradient-to-r from-slate-400 to-slate-300 bg-clip-text text-2xl font-bold text-transparent">
                CreateCollab
              </div>
              <p className="leading-relaxed text-slate-400">
                Empowering the creator economy by connecting brands with
                talented creators for authentic, results-driven partnerships.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: ["For Creators", "For Brands", "Pricing", "Features"],
              },
              {
                title: "Resources",
                links: [
                  "Help Center",
                  "Creator Guide",
                  "Brand Resources",
                  "API Docs",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Contact"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="mb-4 font-semibold text-slate-300">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="text-slate-400 transition-colors duration-300 hover:text-white">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="mb-8 bg-slate-800" />
          <div className="text-center text-slate-400">
            <p>
              &copy; 2025 CreateCollab. All rights reserved. | Privacy Policy |
              Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
