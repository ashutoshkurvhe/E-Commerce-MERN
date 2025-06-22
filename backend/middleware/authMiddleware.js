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
        // ...existing code...
      } catch (error) {
        // ...existing code...
      }
    } else {
      res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({message: "Not authorized as an admin"});
    }
        
    
}

module.exports = { protect , admin};