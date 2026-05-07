const jwt  = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect – requires a valid Bearer token.
 * Attaches req.user (public shape) on success.
 */
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authenticated. Please log in." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User no longer exists." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

/**
 * optionalAuth – attaches req.user if a valid token is present,
 * but does NOT block the request if there is no token.
 */
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) req.user = user;
  } catch {
    // Ignore invalid token in optional auth
  }

  next();
};

/**
 * adminOnly – must be used AFTER protect.
 */
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }
  next();
};

module.exports = { protect, optionalAuth, adminOnly };
