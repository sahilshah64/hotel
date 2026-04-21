import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Data} from "../data";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = Data.find((r) => r.id === parseInt(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  if (!room) return <div className="p-10">Room not found</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="mb-4 text-sm">
        ← Back
      </button>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {room.images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="rounded-xl h-60 w-full object-cover"
          />
        ))}
      </div>

      {/* Info */}
      <h1 className="text-3xl font-semibold">{room.title}</h1>
      <p className="text-gray-500 mt-1">{room.description}</p>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mt-4">
        {room.amenities.map((a, i) => (
          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {a}
          </span>
        ))}
      </div>

      {/* Booking Section */}
      <div className="mt-8 bg-white shadow p-6 rounded-xl max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          ${room.price} / night
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={() =>
              navigate("/booking", {
                state: { room, checkIn, checkOut },
              })
            }
            className="bg-black text-white py-2 rounded"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;