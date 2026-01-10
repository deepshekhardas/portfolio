
import { Request, Response } from 'express';
import Contact, { IContact } from '../models/Contact';

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
