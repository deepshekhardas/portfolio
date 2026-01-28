import { Request, Response } from 'express';
import Testimonial, { ITestimonial } from '../models/Testimonial';

// Default testimonials (fallback/seed data)
const defaultTestimonials = [
    {
        name: "Rahul Sharma",
        role: "CTO",
        company: "TechStart India",
        testimonial: "Deepshekhar delivered an exceptional e-commerce platform for our startup. His backend expertise and attention to detail made the entire process smooth. Highly recommended!",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=3b82f6&color=fff",
        isApproved: true
    },
    {
        name: "Priya Patel",
        role: "Founder",
        company: "FitLife Solutions",
        testimonial: "Working with Deepshekhar on our fitness app was a game-changer. He integrated AI features seamlessly and delivered ahead of schedule. Exceptional developer!",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Priya+Patel&background=8b5cf6&color=fff",
        isApproved: true
    },
    {
        name: "Amit Kumar",
        role: "Product Manager",
        company: "CloudServe Technologies",
        testimonial: "Deepshekhar's full-stack skills are impressive. He built our real-time chat application with Socket.io and it handles thousands of concurrent users flawlessly.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Amit+Kumar&background=10b981&color=fff",
        isApproved: true
    },
    {
        name: "Sneha Reddy",
        role: "CEO",
        company: "Digital Dine",
        testimonial: "Our restaurant SaaS platform looks stunning thanks to Deepshekhar. His React and Tailwind CSS expertise brought our design vision to life perfectly.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=f59e0b&color=fff",
        isApproved: true
    }
];

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
    try {
        let testimonials = await Testimonial.find({ isApproved: true })
            .sort({ createdAt: -1 })
            .limit(10);

        // If no testimonials in DB, seed with defaults
        if (testimonials.length === 0) {
            await Testimonial.insertMany(defaultTestimonials);
            testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
            console.log('✅ Seeded default testimonials');
        }

        res.status(200).json({
            success: true,
            count: testimonials.length,
            testimonials
        });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            testimonials: defaultTestimonials // Return defaults on error
        });
    }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public (Admin can toggle isApproved)
export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, role, company, testimonial, rating, image } = req.body;

        if (!name || !role || !company || !testimonial) {
            res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
            return;
        }

        const newTestimonial: ITestimonial = await Testimonial.create({
            name,
            role,
            company,
            testimonial,
            rating: rating || 5,
            image: image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
            isApproved: true
        });

        res.status(201).json({
            success: true,
            data: newTestimonial,
            message: 'Testimonial created successfully'
        });
    } catch (error: any) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

        if (!testimonial) {
            res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
