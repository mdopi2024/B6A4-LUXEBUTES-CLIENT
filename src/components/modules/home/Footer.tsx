// Footer.tsx

import Link from "next/link";
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold mb-4">LuxeBites 🍱</h2>
          <p className="text-gray-200">
            Discover and order delicious meals from your favorite local restaurants.
            Fast, fresh, and easy!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-100 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-gray-100 transition-colors">Menu</Link>
            </li>
            <li>
              <a href='#' className="hover:text-gray-100 transition-colors">Providers</a>
            </li>
            <li>
              <a href='#' className="hover:text-gray-100 transition-colors">About</a>
            </li>
            <li>
              <a href='#' className="hover:text-gray-100 transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="flex items-center gap-2 mb-4 text-gray-200">
            <FiMail /> support@LuxeBites.com
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-100 transition-colors">
              <FiFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-100 transition-colors">
              <FiInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-100 transition-colors">
              <FiTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="mb-4 text-gray-200">
            Get updates on new meals, offers, and promotions.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-teal-600 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-teal-800 font-semibold rounded-md hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-teal-700 pt-6 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} LuxeBites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;