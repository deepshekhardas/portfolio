import { Request, Response } from 'express';
import { RESUME_CONTEXT } from '../data/resumeContext';

// Using Hugging Face Inference API
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;
        const token = process.env.HF_TOKEN;

        // Check for Token
        if (!token) {
            res.status(500).json({
                success: false,
                message: 'Hugging Face Token not configured. Please add HF_TOKEN to .env'
            });
            return;
        }

        if (!message) {
            res.status(400).json({ success: false, message: 'Message is required' });
            return;
        }

        // Mistral Prompt Format: <s>[INST] System + User [/INST]
        // We combine context and user message
        const fullPrompt = `<s>[INST] You are a helpful assistant for Deepshekhar Das's portfolio. Use the following context to answer the user's question briefly and professionally.\n\nCONTEXT:\n${RESUME_CONTEXT}\n\nUSER QUESTION: ${message} [/INST]`;

        console.log("Sending request to Hugging Face...");

        const response = await fetch(HF_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                inputs: fullPrompt,
                parameters: {
                    max_new_tokens: 250,
                    temperature: 0.7,
                    return_full_text: false,
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("HF API Error:", errorText);
            throw new Error(`Hugging Face API Error: ${response.statusText}`);
        }

        const result = await response.json();
        // HF returns an array: [{ generated_text: "..." }]
        const reply = result[0]?.generated_text || "Sorry, I couldn't generate a response.";

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
