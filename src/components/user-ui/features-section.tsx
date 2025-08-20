"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselItem } from "@/components/user-ui/carousel";
import { VideoCollage } from "@/components/user-ui/video-collage";

interface FeaturesSectionProps {
  scrollY: number;
  animatedElements: Set<string>;
}

export default function FeaturesSection({
  scrollY,
  animatedElements,
}: FeaturesSectionProps) {
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

  return (
    <section
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
                Scale your marketing with authentic creator partnerships. Access
                verified creators, track campaign performance, and grow your
                reach with data-driven insights.
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
              <CardTitle className="text-3xl font-bold">For Creators</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="mb-6 text-lg leading-relaxed text-emerald-100">
                Monetize your content and build your career. Connect with
                premium brands, secure fair compensation, and grow your audience
                with professional opportunities.
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
  );
}
