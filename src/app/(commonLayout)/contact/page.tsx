// app/contact/page.tsx
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowRight, FiCheck } from "react-icons/fi";

const display = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: FiMail,
    label: "Email",
    value: "support@luxebites.com",
    href: "mailto:support@luxebites.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+1 (123) 456-7890",
    href: "tel:+11234567890",
  },
  {
    icon: FiMapPin,
    label: "Address",
    value: "123 Market Street, Dhaka, Bangladesh",
  },
  {
    icon: FiClock,
    label: "Hours",
    value: "Mon – Sun · 9:00 AM – 11:00 PM",
  },
];

const ContactPage = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Wire this up to your API route or email service when ready.
    // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    console.log("Contact form submitted:", form);

    setSubmitted(true);
    setForm(initialForm);

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main
      className={`${display.variable} ${body.variable} bg-[#FBF7EF] min-h-screen font-[var(--font-body)]`}
    >
      {/* Hero — deliberately distinct from the navbar's solid teal band */}
      <section className="relative overflow-hidden bg-[#0B3B36] py-24 px-6 md:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl animate-[float_9s_ease-in-out_infinite]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl animate-[float_11s_ease-in-out_infinite_reverse]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:28px_28px]"
        />

        <div className="relative max-w-4xl mx-auto text-center animate-[fadeUp_0.8s_ease-out]">
          <span className="inline-block text-amber-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            We&apos;re listening
          </span>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Let&apos;s talk food,
            <br className="hidden md:block" /> feedback &amp; everything else
          </h1>
          <p className="text-teal-100/80 text-lg max-w-2xl mx-auto">
            Questions about an order, a restaurant partnership, or just want to say hi?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 -mt-16 relative z-10 pb-24 grid md:grid-cols-5 gap-8">
        {/* Contact Info — now on the left, styled as a dark elevated panel */}
        <div
          className="md:col-span-2 bg-[#0B3B36] text-white rounded-2xl p-8 md:p-10 shadow-xl shadow-teal-900/20 animate-[fadeUp_0.8s_ease-out_0.1s_both] relative overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl"
          />
          <h2 className="font-[var(--font-display)] text-2xl font-semibold mb-2">
            Contact details
          </h2>
          <p className="text-teal-100/70 text-sm mb-8">
            Reach us directly, or drop a note and we&apos;ll route it to the right team.
          </p>

          <ul className="flex flex-col gap-6 relative">
            {/* connecting line, evokes an order-tracking route */}
            <div
              aria-hidden
              className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-amber-400/50 via-white/15 to-transparent"
            />
            {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
              <li
                key={label}
                className="flex items-start gap-4 group animate-[fadeUp_0.6s_ease-out_both]"
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                <span className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-amber-400 text-teal-900 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={18} />
                </span>
                <div className="pt-1">
                  <p className="text-xs uppercase tracking-wide text-teal-100/60 mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-white/90 hover:text-amber-300 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white/90">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Form — now on the right, elevated card that pops off the cream background */}
        <div
          className="md:col-span-3 bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-teal-900/10 border border-teal-900/5 animate-[fadeUp_0.8s_ease-out_0.2s_both]"
        >
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[#0B3B36] mb-1">
            Send us a message
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We typically reply within one business day.
          </p>

          {submitted && (
            <div className="mb-6 flex items-center gap-2 rounded-md border border-amber-400 bg-amber-50 px-4 py-3 text-teal-900 text-sm animate-[fadeUp_0.4s_ease-out]">
              <FiCheck className="text-amber-500 shrink-0" />
              Thanks for reaching out. We will get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#0B3B36] mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-gray-900 transition-shadow duration-200"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0B3B36] mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-gray-900 transition-shadow duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-[#0B3B36] mb-1"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-gray-900 transition-shadow duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#0B3B36] mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us more..."
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-gray-900 resize-none transition-shadow duration-200"
              />
            </div>

            <button
              type="submit"
              className="mt-2 group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B3B36] text-white font-semibold rounded-md transition-all duration-300 hover:bg-amber-400 hover:text-teal-900 hover:shadow-lg hover:shadow-amber-400/30 w-fit"
            >
              Send message
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default ContactPage;