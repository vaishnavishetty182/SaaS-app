import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

// Middleware to log all auth requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// POST login endpoint
//router.post('/login', loginUser);

// Explicitly reject GET requests with proper CORS headers
router.get('/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(405).json({ 
    success: false,
    message: 'Method Not Allowed: Login requires POST request',
    allowedMethods: ['POST']
  });
});

// Handle OPTIONS preflight
router.options('/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(204).end();
});

export default router;