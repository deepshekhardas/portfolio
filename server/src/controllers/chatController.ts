import { Request, Response } from 'express';
import OpenAI from 'openai';
import { RESUME_CONTEXT } from '../data/resumeContext';

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            res.status(500).json({
                success: false,
                message: 'OpenAI API Key not configured. Please add OPENAI_API_KEY to .env'
            });
            return;
        }

        if (!message) {
            res.status(400).json({ success: false, message: 'Message is required' });
            return;
        }

        const openai = new OpenAI({ apiKey });

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: RESUME_CONTEXT },
                { role: "user", content: message }
            ],
            model: "gpt-3.5-turbo",
        });

        const reply = completion.choices[0].message.content || "Sorry, I couldn't generate a response.";

        res.status(200).json({
            success: true,
            reply: reply.trim()
        });

    } catch (error: any) {
        console.error('Chat Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate response',
            error: error.message
        });
    }
};
