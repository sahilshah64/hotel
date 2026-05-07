const express = require("express");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ── POST /api/contact ──────────────────────────────────
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    try {
      const { name, email, subject = "", message } = req.body;
      const contact = await Contact.create({ name, email, subject, message });
      res.status(201).json({ message: "Message received. We'll be in touch soon!", contact });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to send message. Please try again." });
    }
  }
);

// ── GET /api/contact  (admin only) ────────────────────
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

// ── PATCH /api/contact/:id/read  (admin only) ─────────
router.patch("/:id/read", protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: "Message not found." });
    res.json({ contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed." });
  }
});

module.exports = router;
