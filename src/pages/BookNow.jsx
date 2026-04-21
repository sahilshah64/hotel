import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { room, checkIn, checkOut } = state || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    specialRequest: "",
  });

  const [error, setError] = useState("");

  if (!room) return <div className="p-10">No booking data</div>;

  // Calculate nights
  const nights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
      : 0;

  const total = nights * room.price;

  // Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      return setError("Please fill all required fields");
    }

    if (form.guests > room.guests) {
      return setError(`Max ${room.guests} guests allowed`);
    }

    navigate("/success", {
      state: {
        ...form,
        room,
        checkIn,
        checkOut,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
        <button onClick={() => navigate(-1)} className="mb-4 text-sm">
        ← Back
      </button>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT: FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-semibold mb-4">
            Guest Details
          </h1>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              name="guests"
              min="1"
              max={room.guests}
              value={form.guests}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <textarea
              name="specialRequest"
              placeholder="Special Requests (optional)"
              value={form.specialRequest}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <button
              onClick={handleSubmit}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Confirm Booking
            </button>
          </div>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Booking Summary
          </h2>

          <img
            src={room.images[0]}
            alt={room.title}
            className="rounded-xl mb-4 h-40 w-full object-cover"
          />

          <h3 className="font-semibold text-lg">{room.title}</h3>

          <p className="text-gray-500 text-sm mt-1">
            {checkIn} → {checkOut}
          </p>

          <p className="mt-2 text-sm">
            Guests: {form.guests}
          </p>

          <div className="mt-4 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span>${room.price} × {nights} nights</span>
              <span>${total}</span>
            </div>

            <div className="flex justify-between font-bold mt-2 text-lg">
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