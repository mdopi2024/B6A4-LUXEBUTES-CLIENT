// HowItWorksSection.tsx
import React from "react";
import { FiShoppingCart, FiTruck, FiStar } from "react-icons/fi";

const steps = [
  {
    icon: FiShoppingCart,
    number: "01",
    title: "Browse & Select Meals",
    description:
      "Explore a wide variety of cuisines, filter by preferences, and add your favorite meals to the cart.",
  },
  {
    icon: FiTruck,
    number: "02",
    title: "Place & Track Orders",
    description:
      "Checkout with your delivery details and track your order in real-time until it reaches your door.",
  },
  {
    icon: FiStar,
    number: "03",
    title: "Rate & Review",
    description:
      "Share your experience, leave reviews, and help others discover the best meals and providers.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white pt-16 pb-6 px-2 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-amber-600 mb-3">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 tracking-tight mb-4">
            How LuxeBites Works
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Getting your favorite meals is easier than ever — three simple
            steps to a seamless food ordering experience.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {/* connecting line, desktop only */}
          <div
            className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-teal-200 via-amber-300 to-teal-200"
            aria-hidden="true"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center group">
                {/* icon badge */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-teal-900 shadow-lg shadow-teal-900/20 mb-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-amber-500/20">
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.75} />
                  <span className="absolute -bottom-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-bold border-4 border-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-teal-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;