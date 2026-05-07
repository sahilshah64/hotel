import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingBox = ({ price }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <div className="border p-4 rounded-xl mt-6 bg-gray-50">
      <h2 className="font-semibold mb-3">Select Dates</h2>

      <div className="flex gap-4">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          placeholderText="Check-in"
          className="border p-2 rounded w-full"
        />

        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          placeholderText="Check-out"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mt-4 flex justify-between">
        <p>Total per night</p>
        <p className="font-bold">${price}</p>
      </div>

      <button className="w-full mt-4 bg-black text-white py-2 rounded-full">
        Reserve Now
      </button>
    </div>
  );
};

export default BookingBox;