// AboutSection.tsx
import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-white text-gray-900 py-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-teal-800">
          About LuxeBites 🍱
        </h2>

        {/* Intro Paragraph */}
        <p className="text-lg md:text-xl mb-12 text-center text-gray-700 max-w-3xl mx-auto">
          <strong>FoodHub</strong> is your ultimate online platform to discover, order, 
          and enjoy delicious meals from a variety of local restaurants and food providers. 
          Whether you're a customer, provider, or admin, FoodHub ensures a seamless experience for everyone.
        </p>

        {/* Cards Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {/* Customer Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-3 text-teal-800">For Customers</h3>
            <p className="text-gray-700 text-center">
              Browse meals, filter by cuisine or dietary preferences, place orders, and track deliveries in real-time.
            </p>
          </div>

          {/* Provider Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-3 text-teal-800">For Providers</h3>
            <p className="text-gray-700 text-center">
              Effortlessly manage menus, process orders, and update statuses to keep customers satisfied.
            </p>
          </div>

          {/* Admin Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-3 text-teal-800">For Admins</h3>
            <p className="text-gray-700 text-center">
              Oversee the entire platform, manage users, and ensure smooth operations.
            </p>
          </div>
        </div>

        {/* Footer Paragraph */}
        <p className="text-center mt-12 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          FoodHub is more than just a food ordering app—it’s a community that brings food lovers and providers together for a delightful dining experience.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;