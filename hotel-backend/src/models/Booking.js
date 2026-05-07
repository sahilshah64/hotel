const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    // Optional – populated when logged-in user books
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // Guest details (always stored so booking works without an account)
    guestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
    },
    guestEmail: {
      type: String,
      required: [true, "Guest email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    guestPhone: {
      type: String,
      required: [true, "Guest phone is required"],
      trim: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    specialRequest: {
      type: String,
      trim: true,
      default: "",
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

// Validate check-out is after check-in
bookingSchema.pre("validate", function (next) {
  if (this.checkIn && this.checkOut && this.checkOut <= this.checkIn) {
    this.invalidate("checkOut", "Check-out must be after check-in");
  }
  next();
});

// Index for availability checks
bookingSchema.index({ room: 1, checkIn: 1, checkOut: 1, status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
