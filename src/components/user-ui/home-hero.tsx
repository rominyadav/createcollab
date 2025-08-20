"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { VideoCollage } from "@/components/user-ui/video-collage";

interface HomeHeroProps {
  scrollY: number;
}

export default function HomeHero({ scrollY }: HomeHeroProps) {
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
    <section
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
              creators. Grow your business, monetize your creativity, and build
              authentic partnerships that drive results.
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
  );
}
