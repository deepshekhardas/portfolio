import express from 'express';
import { register, login } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register admin user (Protected/Internal Use)
// @access  Public (for now, later restricted)
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Login and get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authMiddleware, (req: any, res) => {
    res.json({ user: req.user });
});

export default router;
