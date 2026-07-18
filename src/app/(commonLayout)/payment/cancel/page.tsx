"use client";

import Link from "next/link";

/**
 * Luxibute — Payment Cancelled
 * app/payment/cancel/page.tsx
 *
 * Same palette AND same ambient background animation as the success page
 * (radial glow + grid + rising particles), so the two pages feel like one
 * family. Only the card's own icon/motion is calmer — no "stamp", since
 * this isn't a moment to celebrate.
 */

export default function PaymentCancelPage() {
  return (
    <div className="lux-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        .lux-wrap {
          min-height: 100vh;
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
          box-shadow: 0 30px 70px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(251,191,36,0.1);
          animation: lux-card-in 0.6s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes lux-card-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lux-card::before {
          content: "";
          position: absolute;
          top: 0; left: 14%; right: 14%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d1d5db, transparent);
          border-radius: 999px;
        }

        .lux-icon {
          width: 84px;
          height: 84px;
          margin: 0 auto 26px;
          position: relative;
          border-radius: 50%;
          background: #f4f2ec;
          opacity: 0;
          animation: lux-fade-scale 0.55s 0.1s ease-out forwards;
        }
        @keyframes lux-fade-scale {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .lux-icon svg {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 34px;
          height: 34px;
          stroke: #115e59;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .lux-icon path {
          stroke-dasharray: 34;
          stroke-dashoffset: 34;
          animation: lux-draw 0.45s 0.4s ease-out forwards;
        }
        @keyframes lux-draw {
          to { stroke-dashoffset: 0; }
        }

        .lux-eyebrow {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #b45309;
          font-weight: 600;
          opacity: 0;
          animation: lux-rise 0.5s 0.35s ease-out forwards;
        }
        .lux-heading {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 500;
          color: #115e59;
          margin: 8px 0 10px;
          opacity: 0;
          animation: lux-rise 0.5s 0.45s ease-out forwards;
        }
        .lux-sub {
          font-size: 14.5px;
          line-height: 1.6;
          color: #5b6b6a;
          opacity: 0;
          animation: lux-rise 0.5s 0.55s ease-out forwards;
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

        .lux-note {
          font-size: 13px;
          color: #8a9998;
          line-height: 1.6;
        }

        .lux-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 26px;
          opacity: 0;
          animation: lux-rise 0.5s 0.65s ease-out forwards;
        }
        .lux-btn-primary, .lux-btn-secondary {
          display: inline-block;
          text-decoration: none;
          border: none;
          border-radius: 12px;
          padding: 13px 18px;
          font-size: 14.5px;
          font-weight: 600;
          text-align: center;
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
        <div className="lux-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 8v5" />
            <path d="M12 16.2v.1" />
          </svg>
        </div>

        <p className="lux-eyebrow">Checkout paused</p>
        <h1 className="lux-heading">Your payment was cancelled</h1>
        <p className="lux-sub">
          No charge was made. Your cart is still saved, so you can pick up right where you left off.
        </p>

        <div className="lux-divider" />
        <p className="lux-note">
          If this was a mistake, you can return to checkout below.
        </p>

        <div className="lux-actions">
          <Link href="/dashboard/my-card" className="lux-btn-primary">
            Return to checkout
          </Link>
          <Link href="/menu" className="lux-btn-secondary">
           Browse menu
          </Link>
        </div>
      </div>
    </div>
  );
}