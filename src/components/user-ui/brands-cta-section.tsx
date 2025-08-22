"use client";

import { Button } from "@/components/ui/button";

export default function BrandsCTASection() {
  return (
    <section className="bg-gradient-to-r from-slate-600 to-slate-800 py-24 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-4xl font-bold">
          Ready to Scale Your Marketing?
        </h2>
        <p className="mb-8 text-xl leading-relaxed text-slate-200">
          Join thousands of brands that are already seeing results through
          authentic creator partnerships.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="hero" size="xl">
            Start Your Campaign
          </Button>
          <Button variant="heroOutline" size="xl">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
