"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <div className="lux-wrap">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        .lux-wrap {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background:
            radial-gradient(circle at 50% 15%, rgba(251,191,36,0.16), transparent 55%),
            linear-gradient(160deg, #0f3d3a 0%, #0c2b29 55%, #082220 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .lux-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 50% 30%, black, transparent 70%);
          pointer-events: none;
        }

        .lux-particle {
          position: absolute;
          bottom: -10px;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #FBBF24;
          opacity: 0;
          animation: lux-float 4.5s ease-in infinite;
        }
        @keyframes lux-float {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translateY(-560px) scale(1); opacity: 0; }
        }

        .lux-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          background: #FFFFFF;
          border-radius: 22px;
          padding: 52px 36px 40px;
          text-align: center;
          box-shadow: 0 30px 70px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(251,191,36,0.15);
          animation: lux-card-in 0.7s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes lux-card-in {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lux-card::before {
          content: "";
          position: absolute;
          top: 0; left: 14%; right: 14%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #FBBF24, transparent);
          border-radius: 999px;
        }

        .lux-seal {
          width: 92px;
          height: 92px;
          margin: 0 auto 26px;
          position: relative;
          animation: lux-stamp 0.65s 0.15s cubic-bezier(.2,1.4,.4,1) both;
        }
        @keyframes lux-stamp {
          0%   { transform: scale(2.4) rotate(-18deg); opacity: 0; }
          55%  { transform: scale(0.92) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .lux-seal-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(from 180deg, #FBBF24, #fde68a, #FBBF24);
          animation: lux-spin 8s linear infinite;
        }
        .lux-seal-ring::after {
          content: "";
          position: absolute;
          inset: 5px;
          border-radius: 50%;
          background: #115e59;
        }
        @keyframes lux-spin {
          to { transform: rotate(360deg); }
        }

        .lux-seal svg {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 40px;
          height: 40px;
          stroke: #FBBF24;
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .lux-seal path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: lux-draw 0.5s 0.55s ease-out forwards;
        }
        @keyframes lux-draw {
          to { stroke-dashoffset: 0; }
        }

        .lux-ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid #FBBF24;
          animation: lux-ripple 1.1s 0.5s ease-out;
        }
        @keyframes lux-ripple {
          from { transform: scale(0.9); opacity: 0.7; }
          to   { transform: scale(1.7); opacity: 0; }
        }

        .lux-eyebrow {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #FBBF24;
          font-weight: 600;
          opacity: 0;
          animation: lux-rise 0.5s 0.45s ease-out forwards;
        }
        .lux-heading {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 500;
          color: #115e59;
          margin: 8px 0 10px;
          opacity: 0;
          animation: lux-rise 0.5s 0.55s ease-out forwards;
        }
        .lux-sub {
          font-size: 14.5px;
          line-height: 1.6;
          color: #5b6b6a;
          opacity: 0;
          animation: lux-rise 0.5s 0.65s ease-out forwards;
        }
        @keyframes lux-rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lux-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e0d4, transparent);
          margin: 24px 0;
        }

        .lux-detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: #115e59;
          padding: 6px 0;
        }
        .lux-detail-row span:first-child { color: #8a9998; }
        .lux-detail-row span:last-child { font-weight: 600; letter-spacing: 0.01em; }

        .lux-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 26px;
          opacity: 0;
          animation: lux-rise 0.5s 0.75s ease-out forwards;
        }
        .lux-btn-primary, .lux-btn-secondary {
          border: none;
          border-radius: 12px;
          padding: 13px 18px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .lux-btn-primary {
          background: #115e59;
          color: #FFFFFF;
        }
        .lux-btn-primary:hover {
          background: #0d4b47;
          transform: translateY(-1px);
          box-shadow: 0 10px 20px -8px rgba(17,94,89,0.55);
        }
        .lux-btn-secondary {
          background: #FFFBEB;
          color: #92660b;
          border: 1px solid #FDE68A;
        }
        .lux-btn-secondary:hover {
          background: #FEF3C7;
          transform: translateY(-1px);
        }
      `}</style>

            {/* ambient rising particles */}
            {[...Array(10)].map((_, i) => (
                <span
                    key={i}
                    className="lux-particle"
                    style={{
                        left: `${8 + i * 9}%`,
                        animationDelay: `${i * 0.45}s`,
                    }}
                />
            ))}

            <div className="lux-card">
                <div className="lux-seal">
                    <div className="lux-seal-ring" />
                    <div className="lux-ripple" />
                    <svg viewBox="0 0 24 24">
                        <path d="M4 12.5l5 5L20 6" />
                    </svg>
                </div>

                <p className="lux-eyebrow">Order confirmed</p>
                <h1 className="lux-heading">Payment successful</h1>
                <p className="lux-sub">
                    Thank you for shopping with Luxibute. A confirmation has been sent to your email.
                </p>

                <div className="lux-divider" />

                <div className="lux-detail-row">
                    <span>Session ID</span>
                    <span>{sessionId ? `${sessionId.slice(0, 14)}…` : "—"}</span>
                </div>

                <div className="lux-actions  ">
                    <Link href="/dashboard/my-orders" className="lux-btn-primary">
                        View my order
                    </Link>
                    <Link href="/dashboard/my-card" className="lux-btn-secondary">
                        Return to cart
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={null}>
            <PaymentSuccessContent />
        </Suspense>
    );
}