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
      // Log token expiration if available
      if (error.expiredAt) {
        console.error("Token expired at:", error.expiredAt);
      } else {
        console.error("Token verification failed:", error.message);
      }

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

// Endpoint for refreshing the access token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new access token
    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }  // Access token expires in 15 minutes
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    // Enhanced error handling for expired or invalid refresh tokens
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Refresh token has expired' });
    }
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

module.exports = { protect, admin, refreshToken };
