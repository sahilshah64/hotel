const express  = require("express");
const jwt       = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User      = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ── Helper ────────────────────────────────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  return null;
};

// ── POST /api/auth/register ───────────────────────────
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const err = handleValidation(req, res);
    if (err) return;

    try {
      const { name, email, password } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ error: "Email already in use." });
      }

      const user  = await User.create({ name, email, password });
      const token = signToken(user._id);

      res.status(201).json({ token, user: user.toPublic() });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Registration failed. Please try again." });
    }
  }
);

// ── POST /api/auth/login ──────────────────────────────
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const err = handleValidation(req, res);
    if (err) return;

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const token = signToken(user._id);
      res.json({ token, user: user.toPublic() });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Login failed. Please try again." });
    }
  }
);

// ── GET /api/auth/me ──────────────────────────────────
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user.toPublic ? req.user.toPublic() : req.user });
});

module.exports = router;
