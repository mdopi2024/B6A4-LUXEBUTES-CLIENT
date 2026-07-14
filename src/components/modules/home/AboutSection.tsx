// AboutSection.tsx
import React from "react";

type Role = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const roles: Role[] = [
  {
    title: "For Customers",
    description:
      "Browse meals, filter by cuisine or dietary preference, place orders, and track deliveries in real time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" strokeWidth="1.5" stroke="currentColor">
        <path
          d="M6 9V7a6 6 0 1112 0v2M4 9h16l-1.2 10.2a2 2 0 01-2 1.8H7.2a2 2 0 01-2-1.8L4 9z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "For Providers",
    description:
      "Effortlessly manage menus, process incoming orders, and update statuses to keep customers satisfied.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" strokeWidth="1.5" stroke="currentColor">
        <path
          d="M4 9l1.5-5h13L20 9M4 9v9a1 1 0 001 1h1a1 1 0 001-1v-4h10v4a1 1 0 001 1h1a1 1 0 001-1V9M4 9h16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "For Admins",
    description:
      "Oversee the entire platform, manage users and providers, and keep operations running smoothly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" strokeWidth="1.5" stroke="currentColor">
        <path
          d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.5 12l1.8 1.8L14.5 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const AboutSection = () => {
  return (
    <section className=" text-stone-900 py-18 px-6 sm:py-18 sm:px-10 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-4">
          About us
        </p>

        {/* Section Title */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-center text-teal-950 tracking-tight">
          About FoodHub
        </h2>

        {/* Intro Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-center text-stone-600 leading-relaxed max-w-2xl mx-auto">
          <strong className="text-stone-900 font-semibold">FoodHub</strong> is your
          all-in-one platform to discover, order, and enjoy great food from local
          restaurants and providers. Whether you're a customer, a provider, or an
          admin, FoodHub is built around a seamless experience for everyone.
        </p>

        {/* Roles — simple, no cards */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-3 divide-y divide-stone-200 lg:divide-y-0 lg:divide-x">
          {roles.map((role, i) => (
            <div
              key={role.title}
              className={`flex flex-col items-center text-center py-8 lg:py-0 ${
                i === 0 ? "lg:pr-10" : i === roles.length - 1 ? "lg:pl-10" : "lg:px-10"
              }`}
            >
              <div className="text-teal-800 mb-4">{role.icon}</div>
              <h3 className="text-lg sm:text-xl font-serif font-semibold mb-2 text-stone-900">
                {role.title}
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-[15px] max-w-xs">
                {role.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Paragraph */}
        <p className="text-center mt-16 sm:mt-20 text-lg sm:text-xl text-stone-700 leading-relaxed max-w-2xl mx-auto">
          FoodHub is more than a food ordering app &mdash; it's a community that
          brings food lovers and providers together for a delightful dining
          experience.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;