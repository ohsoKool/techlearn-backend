import jwt from "jsonwebtoken";

// Middleware to verify JWT access token from cookies
export const verifyAccessToken = (req, res, next) => {
  // Check for token in cookies
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided in cookies" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

    // Attach user info (userId and role) to the request for later use
    req.user = { _id: decoded.userId, role: decoded.role };

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check if the authenticated user is an admin
export const isAdmin = (req, res, next) => {
  // Check if user role is admin
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next(); // User is admin, continue
};
