
import express from 'express';
import { createContact, getContacts } from '../controllers/contactController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(createContact)
    .get(authMiddleware, getContacts);

export default router;
