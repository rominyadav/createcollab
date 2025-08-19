"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Update active section based on scroll position (only for home page)
      if (pathname === "/") {
        if (currentScrollY < window.innerHeight * 0.5) {
          setActiveSection("home");
        } else if (currentScrollY < window.innerHeight * 1.5) {
          setActiveSection("features");
        } else if (currentScrollY < window.innerHeight * 2.5) {
          setActiveSection("stats");
        } else {
          setActiveSection("footer");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActivePage = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", label: "home", action: () => scrollToSection("home") },
    { path: "/", label: "features", action: () => scrollToSection("features") },
    { path: "/creators", label: "creators", action: () => {} },
    { path: "/brands", label: "brands", action: () => {} },
    { path: "/about", label: "about", action: () => {} },
  ];

  return (
    <nav
      className={`fixed top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md transition-all duration-300 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-2xl font-bold text-transparent"
          >
            CreateCollab
          </Link>

          <ul className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.path === "/" && pathname === "/" ? (
                  <button
                    onClick={item.action}
                    className={`capitalize transition-colors duration-300 ${
                      activeSection === item.label
                        ? "font-semibold text-slate-600"
                        : "text-gray-600 hover:text-slate-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`capitalize transition-colors duration-300 ${
                      isActivePage(item.path)
                        ? "font-semibold text-slate-600"
                        : "text-gray-600 hover:text-slate-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex space-x-4">
            <Link href="/sign-in">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="gradient" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
