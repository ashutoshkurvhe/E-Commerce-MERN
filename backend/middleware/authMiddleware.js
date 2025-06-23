const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const parts = req.headers.authorization.split(" ");
      if (parts.length !== 2) {
        return res
          .status(401)
          .json({ message: "Not authorized, token format invalid" });
      }
      token = parts[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find user by ID from token payload
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
