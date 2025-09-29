import React from "react";
import { FaPhoneAlt, FaEnvelope, FaTruck, FaGlobe } from "react-icons/fa";

const TopbarInfo = () => {
  return (
    <div className="sm:hidden md:block bg-white text-black py-2 px-5 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Contact Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaPhoneAlt className="mr-1" />
            <span>+8801879808105</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="ml-4 mr-1" />
            <span>support@sagor.com</span>
          </div>
        </div>

        {/* Right side - Additional Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaTruck className="mr-1" />
            <span>Free Shipping on Orders Over 5k</span>
          </div>
          <div className="flex items-center">
            <FaGlobe className="ml-4 mr-1" />
            <span>Chittagong Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopbarInfo;
