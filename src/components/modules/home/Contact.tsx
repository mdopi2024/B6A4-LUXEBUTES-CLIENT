"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-teal-50/40 px-4 pb-20 sm:px-6">
      <div
        ref={sectionRef}
        className={`mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl bg-teal-900 px-6 py-12 shadow-md ring-1 ring-teal-900/5 sm:px-14 sm:py-16">
          {/* Animated gradient wash */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(245,158,11,0.10),transparent)] bg-[length:200%_200%] animate-[shimmer_6s_ease-in-out_infinite]" />

          {/* Floating decorative shapes */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-500/10 animate-[float_7s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-teal-700/30 animate-[float_9s_ease-in-out_infinite_reverse]" />
          <div className="pointer-events-none absolute right-1/4 bottom-0 h-24 w-24 rounded-full bg-amber-400/10 animate-[float_5s_ease-in-out_infinite]" />

          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-amber-400 mb-3">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                Hungry? Let&apos;s fix that.
              </h2>
              <p className="text-teal-50/80 text-base sm:text-lg md:text-xl leading-relaxed">
                Order from your favorite local restaurants and get it
                delivered fresh, fast, and safely to your door.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-shrink-0">
              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-4 text-base font-semibold text-teal-950 shadow-sm transition-all duration-200 hover:bg-amber-400 hover:shadow-[0_0_0_4px_rgba(245,158,11,0.25)] active:scale-[0.98]"
              >
                Order Now
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]"
              >
                <PhoneCall className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-14px) translateX(6px);
          }
        }
        @keyframes shimmer {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[float_7s_ease-in-out_infinite\\],
          .animate-\\[float_9s_ease-in-out_infinite_reverse\\],
          .animate-\\[float_5s_ease-in-out_infinite\\],
          .animate-\\[shimmer_6s_ease-in-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}