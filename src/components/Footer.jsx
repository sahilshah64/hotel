import React from "react";
import { HouseHeart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#84B179] text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-10 sm:py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* BRAND */}
          <div>
            <h1 className="flex items-center text-lg sm:text-xl font-bold mb-3">
              <HouseHeart className="text-[#E8F5BD] mr-1" />
              lonely
            </h1>
            <p className="text-sm text-[#E8F5BD] max-w-[280px]">
              Find your perfect stay with comfort and ease.
              We provide the best rooms for your vacation.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">
              Company
            </h3>
            <ul className="text-sm space-y-2">
              <li
               className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">About</li>
              <li className="hover:underline cursor-pointer">Rooms</li>
              <li className="hover:underline cursor-pointer">Services</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">
              Support
            </h3>
            <ul className="text-sm space-y-2">
              <li className="hover:underline cursor-pointer">Help Center</li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Terms</li>
              <li className="hover:underline cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">
              Contact
            </h3>
            <p className="text-sm text-[#E8F5BD] leading-relaxed">
              Email: support@lonely.com <br />
              Phone: +977 98XXXXXXXX
            </p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#E8F5BD] pt-4 text-xs sm:text-sm text-center text-[#E8F5BD]">
          © {new Date().getFullYear()} Lonely. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;