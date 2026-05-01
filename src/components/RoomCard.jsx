import React from "react";
import { useNavigate } from "react-router-dom";
import heropage from "../assets/heropage.jpg";

const staysData = [
  {
    id: 1,
    title: "38M Flat",
    location: "41 St. New York",
    image: heropage,
  },
  {
    id: 2,
    title: "50M Flat",
    location: "21 St. California",
    image: heropage,
  },
  {
    id: 3,
    title: "70M Flat",
    location: "Main St. Texas",
    image: heropage,
  },
];

const RoomCard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* LEFT CARDS */}
        {staysData.slice(0, 2).map((item) => (
          <div key={item.id} className="relative rounded-2xl overflow-hidden group">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[180px] sm:h-[200px] object-cover 
                         group-hover:scale-105 transition duration-300"
            />

            <div className="mt-2 px-1">
              <h3 className="font-semibold text-sm sm:text-base">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                {item.location}
              </p>
            </div>

            {/* Top right dot */}
            <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
              ⚪
            </div>
          </div>
        ))}

        {/* MIDDLE TEXT BLOCK */}
        <div className="bg-gray-50 rounded-2xl flex flex-col justify-center px-4 sm:px-6 py-4 text-center sm:text-left">
          <p className="text-gray-500 text-xs sm:text-sm mb-2">
            DISCOVER YOUR PERFECT STAY
          </p>

          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Best option to stay here for your summer vacations
          </h2>

          <button
            onClick={() => navigate("/rooms")}
            className="text-sm font-medium flex justify-center sm:justify-start items-center gap-1 hover:underline"
          >
            Explore More →
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src={staysData[2].image}
            alt={staysData[2].title}
            className="w-full h-[180px] sm:h-[200px] object-cover 
                       group-hover:scale-105 transition duration-300"
          />

          <div className="mt-2 px-1">
            <h3 className="font-semibold text-sm sm:text-base">
              {staysData[2].title}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              {staysData[2].location}
            </p>
          </div>

          <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
            ⚪
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomCard;