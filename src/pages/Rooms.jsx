import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../data";

const categories = ["All", "Villa", "Apartment", "Mansion", "Cottage"];

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
        Accommodation
      </h1>

      {/* Categories */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full transition ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-white text-gray-600 shadow"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rooms */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => navigate(`/room/${room.id}`)}
            className="flex bg-white rounded-2xl shadow p-4 gap-6 cursor-pointer hover:shadow-lg transition"
          >
            <div className="relative w-64 h-40 flex-shrink-0">
              <img
                src={room.images?.[0] || room.image}
                alt={room.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-2 right-2 bg-white px-2 py-1 text-sm rounded-full shadow">
                ⭐ {room.rating}
              </span>
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-lg font-semibold">{room.title}</h2>
                <p className="text-gray-500 text-sm">{room.location}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <h3 className="text-xl font-bold">
                  ${room.price}/night
                </h3>

                <button className="bg-black text-white px-6 py-2 rounded-full">
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