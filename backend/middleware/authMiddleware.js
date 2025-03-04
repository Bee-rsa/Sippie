const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header is present
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token with the JWT secret from the environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user based on the decoded token and attach to request
      req.user = await User.findById(decoded.user.id).select("-password"); // Exclude password
      next();
    } catch (error) {
      console.error("Token verification failed:", error);

      // Handle different JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token signature" });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token has expired" });
      }
      // Generic error response
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
