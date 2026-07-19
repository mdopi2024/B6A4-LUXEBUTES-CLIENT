"use client";

import React, { useState } from "react";
import { ChevronDown, Truck, CreditCard, XCircle, RotateCcw } from "lucide-react";

interface FaqItem {
  icon: React.ElementType;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    icon: Truck,
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 24 hours of confirmation. For remote areas, delivery may take up to 2-3 business days depending on your location.",
  },
  {
    icon: CreditCard,
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery. All online payments are processed securely.",
  },
  {
    icon: XCircle,
    question: "Can I cancel my order?",
    answer:
      "Yes, orders can be cancelled free of charge before they're dispatched. Once an order is out for delivery, cancellation may no longer be possible.",
  },
  {
    icon: RotateCcw,
    question: "What is your refund policy?",
    answer:
      "If an item arrives damaged, spoiled, or incorrect, you're eligible for a full refund or replacement. Refunds are typically processed within 3-5 business days.",
  },
];

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;

  return (
    <div className="border-b border-teal-900/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 py-5 text-left transition-colors duration-200 hover:bg-teal-50/60 sm:px-2"
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>

        <span className="flex-1 text-lg md:text-xl font-semibold text-teal-900">
          {item.question}
        </span>

        <ChevronDown
          className="h-5 w-5 flex-shrink-0 text-teal-800/50 transition-transform duration-300 ease-out"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="grid overflow-hidden transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-14 pr-6 text-gray-600 leading-relaxed sm:pl-16">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-teal-50/40 px-6 pb-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-amber-600 mb-3">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to know before placing your order.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-2 shadow-md ring-1 ring-teal-900/5 sm:p-4">
          {faqs.map((item, i) => (
            <FaqRow
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}