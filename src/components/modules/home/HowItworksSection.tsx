// HowItWorksSection.tsx
import React from "react";
import { FiShoppingCart, FiTruck, FiStar } from "react-icons/fi";

const steps = [
  {
    icon: <FiShoppingCart className="w-12 h-12 text-teal-800 mb-4" />,
    title: "Browse & Select Meals",
    description:
      "Explore a wide variety of cuisines, filter by preferences, and add your favorite meals to the cart.",
  },
  {
    icon: <FiTruck className="w-12 h-12 text-teal-800 mb-4" />,
    title: "Place & Track Orders",
    description:
      "Checkout with your delivery details and track your order in real-time until it reaches your door.",
  },
  {
    icon: <FiStar className="w-12 h-12 text-teal-800 mb-4" />,
    title: "Rate & Review",
    description:
      "Share your experience, leave reviews, and help others discover the best meals and providers.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white pt-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-teal-800">
          How LuxeBites Works
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
          Getting your favorite meals is now easier than ever. Follow these simple steps to enjoy a seamless food ordering experience.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-xl"
            >
              {step.icon}
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;