// middleware/auth.js
const jwt = require('jsonwebtoken');

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Ensure your secret key is set in .env
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

// Super Admin Role Middleware
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Access denied. Not Super Admin.' });
  }
  next();
};

// Organization Admin Role Middleware
const isOrgAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Not Org Admin.' });
  }
  next();
};

// Authenticate using Bearer token for other routes
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'secretKey'); // Ensure your secret key is consistent
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken, isSuperAdmin, isOrgAdmin, authenticate };
