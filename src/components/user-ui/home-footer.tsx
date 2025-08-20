"use client";

import { Separator } from "@/components/ui/separator";

export default function HomeFooter() {
  const footerSections = [
    {
      title: "Platform",
      links: ["For Creators", "For Brands", "Pricing", "Features"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Creator Guide", "Brand Resources", "API Docs"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Contact"],
    },
  ];

  return (
    <footer className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 lg:grid-cols-4">
          <div>
            <div className="mb-4 bg-gradient-to-r from-slate-400 to-slate-300 bg-clip-text text-2xl font-bold text-transparent">
              CreateCollab
            </div>
            <p className="leading-relaxed text-slate-400">
              Empowering the creator economy by connecting brands with talented
              creators for authentic, results-driven partnerships.
            </p>
          </div>
          {footerSections.map((section, index) => (
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
  );
}
