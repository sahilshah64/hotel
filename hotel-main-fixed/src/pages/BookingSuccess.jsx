import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Users, DollarSign, Hash } from "lucide-react";

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate  = useNavigate();

  if (!state?.room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No booking information found.</p>
          <button onClick={() => navigate("/")} className="bg-black text-white px-6 py-2 rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const { room, checkIn, checkOut, total, name, email, bookingId } = state;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">

        <CheckCircle size={64} className="text-[#84B179] mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-1">Booking Confirmed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          A confirmation has been sent to <strong>{email}</strong>
        </p>

        <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">{room.title}</h2>

          {bookingId && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hash size={16} />
              <span>Booking ID: <strong>#{bookingId}</strong></span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{checkIn} → {checkOut}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} />
            <span>Guest: {name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <DollarSign size={16} />
            <span>Total Paid: ${total}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/rooms")}
            className="flex-1 border border-black text-black py-2 rounded-lg hover:bg-gray-50 transition text-sm"
          >
            Browse More Rooms
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
