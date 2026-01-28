
import { Request, Response } from 'express';
import Contact, { IContact } from '../models/Contact';
import { sendContactNotification } from '../services/emailService';

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            res.status(400).json({ success: false, message: 'Please provide all fields' });
            return;
        }

        const contact: IContact = await Contact.create({
            name,
            email,
            message
        });

        console.log(`Message received from: ${email}`);

        // Send email notification (non-blocking)
        sendContactNotification(name, email, message).catch(err => {
            console.error('Email notification failed:', err);
        });

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully'
        });
    } catch (error: any) {
        console.error('Error creating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
export const getContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error: any) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
