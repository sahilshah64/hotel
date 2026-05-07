import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingsAPI } from "../api";

const BookNow = () => {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const { room, checkIn, checkOut } = state || {};

  const [form, setForm] = useState({
    name: "", email: "", phone: "", guests: 1, specialRequest: "",
  });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  if (!room) return <div className="p-10">No booking data found. Please go back and select a room.</div>;

  const nights = checkIn && checkOut
    ? Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0;
  const total = nights * room.price;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.phone) {
      return setError("Please fill all required fields.");
    }
    if (form.guests > room.guests || form.guests < 1) {
      return setError(`Guests must be between 1 and ${room.guests}.`);
    }
    if (nights <= 0) {
      return setError("Please select valid check-in and check-out dates.");
    }

    setLoading(true);
    try {
      const data = await bookingsAPI.create({
        roomId:         room.id,
        guestName:      form.name,
        guestEmail:     form.email,
        guestPhone:     form.phone,
        guests:         Number(form.guests),
        checkIn,
        checkOut,
        specialRequest: form.specialRequest,
      });
      navigate("/success", {
        state: { ...form, room, checkIn, checkOut, total, bookingId: data.booking?.id },
      });
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm hover:underline">← Back</button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-semibold mb-4">Guest Details</h1>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-3">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-4">
            <input type="text"   name="name"  placeholder="Full Name *"      value={form.name}  onChange={handleChange} className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]" />
            <input type="email"  name="email" placeholder="Email Address *"  value={form.email} onChange={handleChange} className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]" />
            <input type="tel"    name="phone" placeholder="Phone Number *"   value={form.phone} onChange={handleChange} className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]" />

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Number of Guests (max {room.guests})</label>
              <input type="number" name="guests" min="1" max={room.guests} value={form.guests} onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]" />
            </div>

            <textarea name="specialRequest" placeholder="Special Requests (optional)" value={form.specialRequest}
              onChange={handleChange} rows={3}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179] resize-none" />

            <button onClick={handleSubmit} disabled={loading}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 font-medium">
              {loading ? "Confirming..." : "Confirm Booking"}
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

          <img src={room.images[0]} alt={room.title} className="rounded-xl mb-4 h-40 w-full object-cover" />

          <h3 className="font-semibold text-lg">{room.title}</h3>
          <p className="text-gray-500 text-sm mt-1">
            📅 {checkIn} → {checkOut}
          </p>
          <p className="mt-2 text-sm">👥 Guests: {form.guests}</p>
          <p className="text-sm text-gray-500 mt-1">🌙 {nights} night{nights !== 1 ? "s" : ""}</p>

          <div className="mt-4 border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>${room.price} × {nights} nights</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
