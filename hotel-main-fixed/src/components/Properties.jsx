import React, { useState, useRef } from "react";
import { ChevronLeft, Heart } from "lucide-react";
import { LuChevronRight } from "react-icons/lu";
import { Data } from "../data";

const Properties = () => {
  const [liked, setLiked] = useState([]);
  const scrollRef = useRef(null);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 280;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-10 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
          Stay at our top unique properties
        </h2>
        <p className="text-gray-500 mb-6 sm:mb-8 text-center text-sm sm:text-base">
          From castles and villas to boats and igloos, we have it all
        </p>

        {/* Slider */}
        <div className="relative">

          {/* LEFT BUTTON (desktop only) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 
                       bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
          >
            {Data.slice(0, 5).map((item) => {
              const isLiked = liked.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] 
                             bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  {/* Image */}
                  <div className="relative group">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-full h-40 sm:h-44 md:h-48 object-cover 
                                 rounded-t-xl group-hover:scale-105 transition duration-300"
                    />

                    {/* Heart */}
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                    >
                      <Heart
                        size={18}
                        className={
                          isLiked ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.location}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {item.rating}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {item.reviews} reviews
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-2 sm:mt-3">
                      {item.oldPrice && (
                        <p className="text-xs sm:text-sm text-gray-400 line-through">
                          NPR {item.oldPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="font-semibold text-base sm:text-lg">
                        NPR {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT BUTTON (desktop only) */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 
                       bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
          >
            <LuChevronRight size={22} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Properties;