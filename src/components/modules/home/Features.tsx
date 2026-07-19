'use client';

import { useEffect, useRef, useState } from 'react';

type Feature = {
  stop: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    stop: 'STOP 01',
    title: '30-Minute Delivery',
    description:
      "Your order leaves the kitchen and reaches your door in under 30 minutes, or the delivery fee is on us.",
    icon: (
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    ),
  },
  {
    stop: 'STOP 02',
    title: 'Live Rider Tracking',
    description:
      'Watch your rider move on the map in real time, from pickup to your doorstep, no guessing games.',
    icon: (
      <>
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      </>
    ),
  },
  {
    stop: 'STOP 03',
    title: 'Fresh & Hot, Guaranteed',
    description:
      "Sealed insulated bags keep food at the right temperature. If it isn't hot, we replace it, free.",
    icon: (
      <>
        <path d="M4 11c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M3 11h18l-1.5 8a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2L3 11z" />
        <path d="M9 15v-2M12 15v-2M15 15v-2" />
      </>
    ),
  },
  {
    stop: 'STOP 04',
    title: 'Honest, Best-Match Pricing',
    description:
      "No surge pricing, no hidden fees. Find it cheaper elsewhere and we'll match it, on the spot.",
    icon: (
      <path d="M12 2v20M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.6-5 3.5S9.2 10 12 10s5 1.6 5 3.5-2.2 3.5-5 3.5-5-1.6-5-3.5" />
    ),
  },
  {
    stop: 'STOP 05',
    title: '1,000+ Local Kitchens',
    description:
      'From street-food favorites to home chefs, browse a menu that grows with your neighborhood.',
    icon: (
      <>
        <path d="M3 7h18M3 12h18M3 17h18" />
        <circle cx="7" cy="7" r="1.4" fill="#115E59" stroke="none" />
        <circle cx="7" cy="12" r="1.4" fill="#115E59" stroke="none" />
        <circle cx="7" cy="17" r="1.4" fill="#115E59" stroke="none" />
      </>
    ),
  },
  {
    stop: 'STOP 06',
    title: 'Real Humans, Anytime',
    description:
      "Order problems don't wait for business hours. Neither does our support team, day or night.",
    icon: (
      <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.5 8.5 0 0 1-4-1L3 20l1.1-4.9A8.5 8.5 0 1 1 21 11.5z" />
    ),
  },
];

const ROUTE_D =
  'M 10,40 C 160,-10 260,90 420,40 S 680,-10 820,40 S 960,90 970,40';
const RIDE_DURATION_MS = 7000;

function RouteRider() {
  const pathRef = useRef<SVGPathElement>(null);
  const riderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const pathEl = pathRef.current;
    const riderEl = riderRef.current;
    if (!pathEl || !riderEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const totalLength = pathEl.getTotalLength();

    if (prefersReducedMotion) {
      const point = pathEl.getPointAtLength(totalLength * 0.5);
      riderEl.style.transform = `translate(${point.x - 13}px, ${point.y - 13}px)`;
      return;
    }

    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = (timestamp - startTime) % RIDE_DURATION_MS;
      const progress = elapsed / RIDE_DURATION_MS;
      const point = pathEl.getPointAtLength(progress * totalLength);

      riderEl.style.transform = `translate(${point.x - 13}px, ${point.y - 13}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative mx-auto mb-2 hidden h-[70px] max-w-[980px] md:block">
      <svg viewBox="0 0 980 80" className="h-full w-full overflow-visible">
        <path
          ref={pathRef}
          d={ROUTE_D}
          fill="none"
          stroke="#115E59"
          strokeWidth="2"
          strokeDasharray="2 10"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
      <div ref={riderRef} className="absolute top-0 left-0">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-amber-400 shadow-[0_6px_16px_-4px_rgba(245,158,11,0.6)]">
          <svg
            viewBox="0 0 24 24"
            className="h-[15px] w-[15px]"
            fill="none"
            stroke="#0A2E2B"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="5" cy="18" r="2.5" />
            <circle cx="17" cy="18" r="2.5" />
            <path d="M5 18h5l2-6h4l2 4h1" />
            <path d="M9 12l2-4h3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        'group relative rounded-[20px] border border-teal-800/10 bg-white p-8 pb-9',
        'shadow-[0_2px_14px_-6px_rgba(10,46,43,0.10)]',
        'transition-all duration-500 ease-out hover:-translate-y-2.5',
        'hover:shadow-[0_20px_45px_-20px_rgba(10,46,43,0.35)] hover:border-amber-400/40',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7',
      ].join(' ')}
      style={{ transitionDelay: visible ? `${(index % 3) * 90}ms` : '0ms' }}
    >
      <span className="mb-3.5 block font-semibold text-[12px] tracking-[0.08em] text-amber-500">
        {feature.stop}
      </span>

      <div
        className={[
          'mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50',
          'transition-all duration-300 group-hover:bg-amber-400 group-hover:-rotate-6 group-hover:scale-105',
        ].join(' ')}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 stroke-teal-800 transition-colors duration-300 group-hover:stroke-teal-950"
        >
          {feature.icon}
        </svg>
      </div>

      <h3 className="mb-2.5 text-[19px] font-bold text-teal-950">
        {feature.title}
      </h3>
      <p className="text-[14.5px] leading-relaxed text-teal-900/60">
        {feature.description}
      </p>

      <span className="absolute bottom-0 left-6 right-6 h-[3px] origin-left scale-x-0 rounded-t-[3px] bg-gradient-to-r from-teal-800 to-amber-400 transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-20 right-[8%] h-[280px] w-[280px] animate-[float_14s_ease-in-out_infinite] rounded-full bg-amber-400 opacity-50 blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-16 left-[4%] h-[220px] w-[220px] animate-[float_14s_ease-in-out_-6s_infinite] rounded-full bg-teal-800 opacity-[0.18] blur-[60px]" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* heading */}
        <div className="mx-auto mb-8 max-w-[640px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-teal-800">
            <span className="h-[7px] w-[7px] rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.25)]" />
            Why Laxebute
          </span>
          <h2 className="mb-4 font-[800] text-[clamp(32px,4.5vw,46px)] leading-[1.12] text-teal-950">
            Cravings, met with{' '}
            <span className="relative whitespace-nowrap text-amber-500">
              speed.
              <svg
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full"
              >
                <path
                  d="M2,7 C50,2 150,2 198,7"
                  stroke="#FBBF24"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-[16.5px] leading-relaxed text-teal-900/70">
            Every order runs on one route: your kitchen, your rider, your
            door. Here&apos;s what happens along the way.
          </p>
        </div>

        {/* route signature */}
        <RouteRider />

        {/* grid */}
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -25px) scale(1.06);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}