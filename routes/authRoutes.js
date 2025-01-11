import express from 'express';
import rateLimiter from 'express-rate-limit';
import { register, login, updateUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

// limit request
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 request
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Routes
router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, updateUser);

// Exports
export default router;
