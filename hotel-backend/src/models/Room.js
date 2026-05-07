const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Room title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Room", "Suite"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Allow filtering by category and price
roomSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model("Room", roomSchema);
