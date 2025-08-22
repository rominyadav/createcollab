"use client";

import * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({
  children,
  className,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  interval = 5000,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  const goToSlide = React.useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [isTransitioning, currentSlide]
  );

  const nextSlide = React.useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = React.useCallback(() => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  }, [currentSlide, totalSlides, goToSlide]);

  React.useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              style={{ minWidth: "100%" }}
            >
              {child}
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <Button
              variant="carousel"
              size="icon"
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2"
              onClick={prevSlide}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="carousel"
              size="icon"
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2"
              onClick={nextSlide}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {showDots && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Button
              key={index}
              variant={index === currentSlide ? "carouselActive" : "carousel"}
              size="carousel"
              onClick={() => goToSlide(index)}
              className="transition-all duration-300"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CarouselItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
