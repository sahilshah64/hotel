/**
 * Seed script – populates the database with rooms from the frontend data.js
 * Usage: npm run seed
 */
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const Room = require("../src/models/Room");
const User = require("../src/models/User");

const rooms = [
  {
    title: "Deluxe Room",
    category: "Room",
    price: 180,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600",
    ],
    description: "Elegant deluxe room with modern furnishings and city view.",
    amenities: ["WiFi", "AC", "TV", "Mini Bar"],
    beds: 1,
    maxGuests: 2,
  },
  {
    title: "Super Deluxe Room",
    category: "Room",
    price: 220,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600",
    ],
    description: "Spacious room with premium interior and balcony access.",
    amenities: ["WiFi", "AC", "Balcony", "Mini Bar", "Room Service"],
    beds: 1,
    maxGuests: 3,
  },
  {
    title: "Executive Suite",
    category: "Suite",
    price: 300,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=600",
    ],
    description: "Luxury suite with separate living area and workspace.",
    amenities: ["WiFi", "AC", "Workspace", "Jacuzzi", "Room Service"],
    beds: 1,
    maxGuests: 4,
  },
  {
    title: "Family Suite",
    category: "Suite",
    price: 350,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600",
    ],
    description: "Perfect for families with multiple beds and extra space.",
    amenities: ["WiFi", "AC", "Kitchenette", "TV", "Room Service"],
    beds: 2,
    maxGuests: 6,
  },
  {
    title: "Presidential Suite",
    category: "Suite",
    price: 600,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2f73?w=600",
    ],
    description: "Top-tier luxury suite with private lounge and premium services.",
    amenities: ["WiFi", "Private Pool", "Jacuzzi", "Butler Service"],
    beds: 2,
    maxGuests: 6,
  },
  {
    title: "Honeymoon Suite",
    category: "Suite",
    price: 400,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
    ],
    description: "Romantic suite designed for couples with beautiful ambiance.",
    amenities: ["WiFi", "Jacuzzi", "Candle Light Setup", "Room Service"],
    beds: 1,
    maxGuests: 2,
  },
];

async function seed() {
  await connectDB();

  console.log("🌱  Seeding database...\n");

  // Rooms
  await Room.deleteMany({});
  const created = await Room.insertMany(rooms);
  console.log(`✅  Inserted ${created.length} rooms`);

  // Admin user
  const existing = await User.findOne({ email: "admin@hotel.com" });
  if (!existing) {
    await User.create({
      name: "Admin",
      email: "admin@hotel.com",
      password: "admin123",
      role: "admin",
    });
    console.log("✅  Admin user created  (admin@hotel.com / admin123)");
  } else {
    console.log("ℹ️   Admin user already exists – skipped");
  }

  console.log("\n🎉  Seed complete!\n");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
