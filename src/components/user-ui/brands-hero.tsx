"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function BrandsHero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-5xl font-bold text-gray-900 lg:text-6xl">
          For Brands
        </h1>
        <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
          Scale your marketing with authentic creator partnerships. Access
          verified creators, track campaign performance, and grow your reach
          with data-driven insights.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="gradient" size="xl">
            <Link href="/sign-up">Start Your Campaign</Link>
          </Button>
          <Button variant="outline" size="xl">
            View Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
}
