const express = require("express");
const { body, param, validationResult } = require("express-validator");
const Booking = require("../models/Booking");
const Room    = require("../models/Room");
const { protect, optionalAuth, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ── POST /api/bookings ─────────────────────────────────
// Works for both authenticated and guest users
router.post(
  "/",
  optionalAuth,
  [
    body("roomId").isMongoId().withMessage("Invalid room ID"),
    body("guestName").trim().notEmpty().withMessage("Guest name is required"),
    body("guestEmail").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("guestPhone").trim().notEmpty().withMessage("Phone number is required"),
    body("guests").isInt({ min: 1 }).withMessage("At least 1 guest required"),
    body("checkIn").isISO8601().withMessage("Valid check-in date is required"),
    body("checkOut").isISO8601().withMessage("Valid check-out date is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    try {
      const {
        roomId,
        guestName,
        guestEmail,
        guestPhone,
        guests,
        checkIn,
        checkOut,
        specialRequest = "",
      } = req.body;

      const checkInDate  = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate <= checkInDate) {
        return res.status(400).json({ error: "Check-out must be after check-in." });
      }

      // Verify room exists
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ error: "Room not found." });

      if (!room.isAvailable) {
        return res.status(400).json({ error: "Room is not available for booking." });
      }

      // Validate guest count
      if (Number(guests) > room.maxGuests) {
        return res.status(400).json({
          error: `This room accommodates a maximum of ${room.maxGuests} guests.`,
        });
      }

      // Check for date conflicts
      const conflict = await Booking.findOne({
        room:    roomId,
        status:  "confirmed",
        checkIn:  { $lt: checkOutDate },
        checkOut: { $gt: checkInDate },
      });

      if (conflict) {
        return res.status(409).json({
          error: "Room is already booked for the selected dates.",
        });
      }

      // Calculate total price
      const nights = Math.round(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = nights * room.price;

      const booking = await Booking.create({
        room:    roomId,
        user:    req.user?._id ?? null,
        guestName,
        guestEmail,
        guestPhone,
        guests:  Number(guests),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        specialRequest,
        totalPrice,
      });

      await booking.populate("room", "title images price category");

      res.status(201).json({ booking });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Booking failed. Please try again." });
    }
  }
);

// ── GET /api/bookings/my ───────────────────────────────
// Returns bookings for the authenticated user
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("room", "title images price category")
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// ── PATCH /api/bookings/:id/cancel ────────────────────
router.patch(
  "/:id/cancel",
  protect,
  [param("id").isMongoId().withMessage("Invalid booking ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) return res.status(404).json({ error: "Booking not found." });

      // Users can only cancel their own bookings; admins can cancel any
      if (
        req.user.role !== "admin" &&
        booking.user?.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ error: "Not authorised to cancel this booking." });
      }

      if (booking.status === "cancelled") {
        return res.status(400).json({ error: "Booking is already cancelled." });
      }

      booking.status = "cancelled";
      await booking.save();

      res.json({ booking });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Cancellation failed." });
    }
  }
);

// ── GET /api/bookings  (admin only) ───────────────────
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .populate("room", "title price")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ bookings, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

module.exports = router;
