import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // React Icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Brand and Description */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Sagor Department
          </h2>
          <p className="text-sm leading-relaxed">
            Sagor Department is your ultimate online shopping destination,
            offering a wide range of products from fashion, electronics, to
            groceries and more. We ensure the best quality and service for every
            customer.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="/shop" className="hover:text-white transition-colors">
                Shop
              </a>
            </li>
            <li className="mb-2">
              <a href="/about" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="/faq" className="hover:text-white transition-colors">
                FAQs
              </a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li className="mb-2">
              <a href="/returns" className="hover:text-white transition-colors">
                Returns & Refunds
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Subscribe and Contact Info */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Subscribe & Contact
          </h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter to get the latest updates and offers.
          </p>
          <form className="mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-black rounded-md mb-4"
            />
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md">
              Subscribe
            </button>
          </form>

          {/* Contact Info */}
          <ul>
            <li className="mb-2">
              <a
                href="mailto:samratakbar667466@gmail.com"
                className="hover:text-white transition-colors"
              >
                info@sagor-department.com
              </a>
            </li>
            <li className="mb-2">
              <a
                href="tel:+8801879808105"
                className="hover:text-white transition-colors"
              >
                +88018798080105
              </a>
            </li>
            <li className="mb-2">
              <p className="hover:text-white transition-colors">
                Sagor Department, Santibag #05, Halishahar, Chittagong
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* Social Icons */}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sagor Department. All rights
          reserved.
        </p>
        <div className="space-x-4 flex">
          <a
            href="https://facebook.com/sagor-department"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/sagor-department"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/company/sagor-department"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
