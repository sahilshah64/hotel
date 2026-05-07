import { ArrowBigRight, Star } from "lucide-react";
import heropage from "../assets/heropage.jpg";
import React from "react";

const HeroPage = () => {
  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 py-10 sm:py-14 lg:py-16">

        {/* LEFT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          
          <p className="flex justify-center lg:justify-start items-center text-sm text-gray-700 mb-4">
            <Star className="w-5 h-5 mr-1" />
            4.5 Rating By Mama's Construction
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#84B179] leading-tight mb-4 sm:mb-6">
            Find out the Best Stay.
          </h1>

          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Suscipit vel ea animi accusamus a natus rem.
          </p>

          {/* BUTTON */}
          <div className="flex justify-center lg:justify-start mb-8">
            <button className="px-5 py-2.5 bg-black text-white rounded-xl font-semibold flex items-center gap-2">
              Get Started <ArrowBigRight size={18} />
            </button>
          </div>

          {/* TRUSTED */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-gray-600 mb-2">Trusted By</p>
            <ul className="flex justify-center lg:justify-start gap-4 sm:gap-6 text-sm flex-wrap">
              <li className="font-semibold">airbnb</li>
              <li className="font-semibold">Emirates</li>
              <li className="font-semibold">
                United<span className="font-normal">travel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={heropage}
            alt="hero"
            className="w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[800px] 
                       h-[250px] sm:h-[300px] lg:h-[400px] 
                       object-cover rounded-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default HeroPage;