import express from 'express';
import { register, login, updateUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

// Routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, updateUser);

// Exports
export default router;
