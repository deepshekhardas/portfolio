import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
    name: string;
    role: string;
    company: string;
    testimonial: string;
    rating: number;
    image?: string;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            trim: true,
        },
        company: {
            type: String,
            required: [true, 'Company is required'],
            trim: true,
        },
        testimonial: {
            type: String,
            required: [true, 'Testimonial text is required'],
            minlength: [10, 'Testimonial must be at least 10 characters'],
            maxlength: [500, 'Testimonial cannot exceed 500 characters'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
            default: 5,
        },
        image: {
            type: String,
        },
        isApproved: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
testimonialSchema.index({ isApproved: 1, createdAt: -1 });

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
