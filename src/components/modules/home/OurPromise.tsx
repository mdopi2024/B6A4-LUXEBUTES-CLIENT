"use client"

import React, { useEffect, useRef, useState } from "react";
import { Leaf, ShieldCheck, Truck, Award, LucideIcon } from "lucide-react";

interface PromiseItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const promises: PromiseItem[] = [
  {
    icon: Leaf,
    title: "Freshness Guarantee",
    desc: "Sourced daily and delivered at peak ripeness, every single time.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Packaging",
    desc: "Sealed with care using food-safe, contamination-free materials.",
  },
  {
    icon: Truck,
    title: "On-Time Delivery",
    desc: "Your order arrives exactly when promised, no delays, no excuses.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    desc: "Every item passes a strict multi-point check before it ships.",
  },
];

interface PromiseCardProps {
  item: PromiseItem;
  index: number;
  visible: boolean;
}

function PromiseCard({ item, index, visible }: PromiseCardProps) {
  const Icon = item.icon;
  return (
  <div
      className="group relative rounded-2xl bg-white p-7 shadow-md ring-1 ring-teal-900/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-1200/10"
      style={{
        transitionProperty: "opacity, transform, box-shadow",
        transitionDuration: "800ms, 800ms, 300ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0px) scale(1)"
          : "translateY(36px) scale(0.96)",
        transitionDelay: `${index * 140}ms`,
        willChange: "opacity, transform",
      }}
    >
      {/* seal / badge */}
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
        <span
          className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/70 transition-transform duration-700 ease-out group-hover:rotate-90"
          aria-hidden="true"
        />
        <span className="absolute inset-1.5 rounded-full bg-teal-800 transition-transform duration-300 ease-out group-hover:scale-105" />
        <Icon
          className="relative h-7 w-7 text-amber-400 transition-transform duration-300 ease-out group-hover:scale-110"
          strokeWidth={2}
        />
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-teal-900 mb-2">{item.title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-xs">{item.desc}</p>

      {/* bottom accent line */}
      <span className="absolute bottom-0 left-7 right-7 h-0.5 origin-left scale-x-0 rounded-full bg-amber-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </div>
  );
}

export default function OurPromise() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-teal-50/40 px-6 pb-20">
      <div className="mx-auto max-w-7xl">
        <div
          className="mb-14 text-center transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(16px)",
          }}
        >
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-amber-600 mb-3">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 tracking-tight mb-4">
            What you can always count on
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Four commitments we never compromise on, order after order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item, i) => (
            <PromiseCard key={item.title} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}