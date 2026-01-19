import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RESUME_CONTEXT } from '../data/resumeContext';

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        console.log('API Key exists:', !!apiKey);
        console.log('API Key prefix:', apiKey?.substring(0, 10));

        if (!apiKey) {
            res.status(500).json({
                success: false,
                message: 'Gemini API Key not configured. Please add GEMINI_API_KEY to .env'
            });
            return;
        }

        if (!message) {
            res.status(400).json({ success: false, message: 'Message is required' });
            return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Use stable flash model alias which has reliable free tier
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `${RESUME_CONTEXT}\n\nUser Question: ${message}\n\nAnswer as Deepshekhar's AI assistant in 2-3 sentences:`;

        console.log('Sending request to Gemini...');

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reply = response.text() || "Sorry, I couldn't generate a response.";

        console.log('Gemini response received successfully');

        res.status(200).json({
            success: true,
            reply: reply.trim()
        });

    } catch (error: any) {
        console.error('Chat Error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        res.status(500).json({
            success: false,
            message: 'Failed to generate response',
            error: error.message
        });
    }
};
