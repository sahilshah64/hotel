import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { roomsAPI } from "../api";
import { Data } from "../data";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [checkIn, setCheckIn]     = useState("");
  const [checkOut, setCheckOut]   = useState("");
  const [availability, setAvail]  = useState(null);
  const [checking, setChecking]   = useState(false);

  useEffect(() => {
    roomsAPI.getById(id)
      .then(({ room }) => setRoom(room))
      .catch(() => {
        const found = Data.find((r) => String(r.id) === id || r._id === id);
        setRoom(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return;
    setChecking(true);
    setAvail(null);
    try {
      const { available } = await roomsAPI.checkAvailability(id, checkIn, checkOut);
      setAvail(available);
    } catch {
      setAvail(true); // fallback: assume available
    } finally {
      setChecking(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (loading) return (
    <div className="flex justify-center items-center py-40">
      <div className="w-8 h-8 border-4 border-[#84B179] border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!room) return <div className="p-10 text-center text-gray-500">Room not found.</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm hover:underline">← Back</button>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {room.images.map((img, i) => (
          <img key={i} src={img} className="rounded-xl h-60 w-full object-cover" alt={room.title} />
        ))}
      </div>

      {/* Info */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
        <h1 className="text-3xl font-semibold">{room.title}</h1>
        <span className="text-lg font-bold text-[#84B179]">${room.price} / night</span>
      </div>
      <p className="text-gray-500">{room.description}</p>
      <p className="text-sm text-gray-500 mt-1">
        🛏 {room.beds} Bed · 👥 Max {room.maxGuests ?? room.guests} guests · ⭐ {room.rating}
      </p>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mt-4">
        {room.amenities.map((a, i) => (
          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{a}</span>
        ))}
      </div>

      {/* Booking Section */}
      <div className="mt-8 bg-white shadow p-6 rounded-xl max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Dates</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Check-in</label>
            <input type="date" min={today} value={checkIn}
              onChange={(e) => { setCheckIn(e.target.value); setAvail(null); }}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#84B179]" />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Check-out</label>
            <input type="date" min={checkIn || today} value={checkOut}
              onChange={(e) => { setCheckOut(e.target.value); setAvail(null); }}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#84B179]" />
          </div>

          {/* Check Availability */}
          {checkIn && checkOut && (
            <button onClick={handleCheckAvailability} disabled={checking}
              className="border border-black text-black py-2 rounded hover:bg-gray-50 transition text-sm">
              {checking ? "Checking..." : "Check Availability"}
            </button>
          )}

          {/* Availability result */}
          {availability === true  && <p className="text-green-600 text-sm font-medium">✅ Room is available for these dates!</p>}
          {availability === false && <p className="text-red-500 text-sm font-medium">❌ Room is not available for these dates.</p>}

          <button
            disabled={availability === false || !checkIn || !checkOut}
            onClick={() => navigate("/booking", { state: { room, checkIn, checkOut } })}
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
