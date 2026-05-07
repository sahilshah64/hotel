const express  = require("express");
const { query, param, validationResult } = require("express-validator");
const Room     = require("../models/Room");
const Booking  = require("../models/Booking");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ── GET /api/rooms ─────────────────────────────────────
// Query params: category, minPrice, maxPrice, beds, guests, page, limit
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 50 }).toInt(),
    query("minPrice").optional().isFloat({ min: 0 }).toFloat(),
    query("maxPrice").optional().isFloat({ min: 0 }).toFloat(),
    query("beds").optional().isInt({ min: 1 }).toInt(),
    query("guests").optional().isInt({ min: 1 }).toInt(),
  ],
  async (req, res) => {
    try {
      const {
        category,
        minPrice,
        maxPrice,
        beds,
        guests,
        page  = 1,
        limit = 20,
      } = req.query;

      const filter = { isAvailable: true };

      if (category) filter.category = category;
      if (beds)     filter.beds     = Number(beds);
      if (guests)   filter.maxGuests = { $gte: Number(guests) };

      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
        if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
      }

      const skip  = (page - 1) * limit;
      const total = await Room.countDocuments(filter);
      const rooms = await Room.find(filter)
        .sort({ price: 1 })
        .skip(skip)
        .limit(limit);

      res.json({
        rooms,
        total,
        page,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch rooms." });
    }
  }
);

// ── GET /api/rooms/:id ─────────────────────────────────
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid room ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ error: "Room not found." });
      res.json({ room });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch room." });
    }
  }
);

// ── GET /api/rooms/:id/availability ───────────────────
// Query: checkIn (YYYY-MM-DD), checkOut (YYYY-MM-DD)
router.get(
  "/:id/availability",
  [
    param("id").isMongoId().withMessage("Invalid room ID"),
    query("checkIn").isISO8601().withMessage("checkIn must be a valid date"),
    query("checkOut").isISO8601().withMessage("checkOut must be a valid date"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const { checkIn, checkOut } = req.query;
      const checkInDate  = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate <= checkInDate) {
        return res.status(400).json({ error: "checkOut must be after checkIn." });
      }

      // Find any confirmed booking that overlaps the requested range
      const conflict = await Booking.findOne({
        room:    req.params.id,
        status:  "confirmed",
        checkIn:  { $lt: checkOutDate },
        checkOut: { $gt: checkInDate },
      });

      res.json({ available: !conflict });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Availability check failed." });
    }
  }
);

// ── POST /api/rooms  (admin only) ─────────────────────
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ room });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /api/rooms/:id  (admin only) ──────────────────
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ error: "Room not found." });
    res.json({ room });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /api/rooms/:id  (admin only) ───────────────
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found." });
    res.json({ message: "Room deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed." });
  }
});

module.exports = router;
