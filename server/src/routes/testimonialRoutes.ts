import express from 'express';
import { getTestimonials, createTestimonial, deleteTestimonial } from '../controllers/testimonialController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getTestimonials);
router.post('/', createTestimonial);

// Protected routes (Admin only)
router.delete('/:id', protect, deleteTestimonial);

export default router;
