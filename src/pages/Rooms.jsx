import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../data";

const categories = ["All", "Room", "Suite"];

const Rooms = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredRooms =
    activeCategory === "All"
      ? Data
      : Data.filter((room) => room.category === activeCategory);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      <h1 className="text-4xl font-semibold text-center mb-6">
        Luxury Hotel Rooms
      </h1>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full transition-all duration-200 ${
              activeCategory === cat
                ? "bg-black text-white scale-105"
                : "bg-white text-gray-600 shadow hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rooms List */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => navigate(`/room/${room.id}`)}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow p-4 gap-6 cursor-pointer hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative w-full md:w-64 h-48 flex-shrink-0">
              <img
                src={room.images?.[0]}
                alt={room.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-2 right-2 bg-white px-2 py-1 text-sm rounded-full shadow">
                ⭐ {room.rating}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-lg font-semibold">{room.title}</h2>
                <p className="text-gray-500 text-sm">
                  🛏 {room.beds} Bed
                </p>
              </div>

              {/* Amenities Preview */}
              <div className="flex flex-wrap gap-2 mt-2">
                {room.amenities.slice(0, 3).map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex justify-between items-center mt-4">
                <h3 className="text-xl font-bold">
                  ${room.price}/night
                </h3>

                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;