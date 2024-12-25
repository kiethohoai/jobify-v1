import express from 'express';

// authController
import { register, login, updateUser } from '../controllers/authController.js';

const router = express.Router();

// Routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);

// Exports
export default router;
