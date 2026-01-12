import request from 'supertest';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { chatWithAI } from '../controllers/chatController';
import { createContact } from '../controllers/contactController';

// 1. Mock the Contact model (Default Export)
const mockContactCreate = jest.fn();
jest.mock('../models/Contact', () => {
    return {
        __esModule: true,
        default: {
            create: (...args: any[]) => mockContactCreate(...args)
        }
    };
});

// 2. Mock global fetch for HuggingFace (Chat Controller)
global.fetch = jest.fn() as jest.Mock;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Manually register routes to avoid importing route files which might have side effects or complex imports
const router = express.Router();
router.post('/chat', chatWithAI);
router.post('/contact', createContact);
app.use('/api', router);

describe('API Integration Tests', () => {

    beforeAll(() => {
        process.env.HF_TOKEN = 'mock-hf-token';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/chat', () => {
        it('should return AI response for valid input', async () => {
            // Mock successful fetch response
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => [{ generated_text: "I am a mocked AI response" }]
            });

            const res = await request(app)
                .post('/api/chat')
                .send({ message: 'Hello' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('reply', 'I am a mocked AI response');
        });

        it('should handle missing message', async () => {
            const res = await request(app)
                .post('/api/chat')
                .send({});

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Message is required');
        });

        it('should handle missing Token gracefully (500)', async () => {
            const originalToken = process.env.HF_TOKEN;
            delete process.env.HF_TOKEN;

            const res = await request(app)
                .post('/api/chat')
                .send({ message: 'Hello' });

            expect(res.status).toBe(500);
            // Restore token
            process.env.HF_TOKEN = originalToken;
        });
    });

    describe('POST /api/contact', () => {
        it('should create contact entry', async () => {
            mockContactCreate.mockResolvedValue({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Hello'
            });

            const res = await request(app)
                .post('/api/contact')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    message: 'Hello'
                });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Message sent successfully');
        });

        it('should validate required fields', async () => {
            const res = await request(app)
                .post('/api/contact')
                .send({
                    name: 'Test User'
                    // missing email and message
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Please provide all fields');
        });
    });
});
