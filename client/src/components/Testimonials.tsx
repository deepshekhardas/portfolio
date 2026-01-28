import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    _id?: string;
    name: string;
    role: string;
    company: string;
    testimonial: string;
    rating: number;
    image?: string;
    createdAt?: Date;
}

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/testimonials`);
            const data = await response.json();
            setTestimonials(data.testimonials || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            // Fallback to static data if API fails
            setTestimonials([
                {
                    name: "Rahul Sharma",
                    role: "CTO",
                    company: "TechStart India",
                    testimonial: "Deepshekhar delivered an exceptional e-commerce platform for our startup. His backend expertise and attention to detail made the entire process smooth. Highly recommended!",
                    rating: 5,
                    image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=3b82f6&color=fff"
                },
                {
                    name: "Priya Patel",
                    role: "Founder",
                    company: "FitLife Solutions",
                    testimonial: "Working with Deepshekhar on our fitness app was a game-changer. He integrated AI features seamlessly and delivered ahead of schedule. Exceptional developer!",
                    rating: 5,
                    image: "https://ui-avatars.com/api/?name=Priya+Patel&background=8b5cf6&color=fff"
                },
                {
                    name: "Amit Kumar",
                    role: "Product Manager",
                    company: "CloudServe Technologies",
                    testimonial: "Deepshekhar's full-stack skills are impressive. He built our real-time chat application with Socket.io and it handles thousands of concurrent users flawlessly.",
                    rating: 5,
                    image: "https://ui-avatars.com/api/?name=Amit+Kumar&background=10b981&color=fff"
                },
                {
                    name: "Sneha Reddy",
                    role: "CEO",
                    company: "Digital Dine",
                    testimonial: "Our restaurant SaaS platform looks stunning thanks to Deepshekhar. His React and Tailwind CSS expertise brought our design vision to life perfectly.",
                    rating: 5,
                    image: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=f59e0b&color=fff"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-play
    useEffect(() => {
        if (testimonials.length > 1) {
            const interval = setInterval(nextTestimonial, 5000);
            return () => clearInterval(interval);
        }
    }, [testimonials.length]);

    if (loading) {
        return (
            <section id="testimonials" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-pulse text-slate-400">Loading testimonials...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) return null;

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Testimonials</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 mx-auto rounded-full"></div>
                    <p className="text-slate-400 mt-8 max-w-2xl mx-auto text-lg font-light">
                        What clients say about working with me
                    </p>
                </motion.div>

                {/* Testimonial Card */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-slate-900/40 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] -z-10"></div>

                        {/* Quote Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-full shadow-lg shadow-indigo-500/30">
                                <Quote className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-slate-300 text-lg md:text-xl text-center mb-8 leading-relaxed italic font-light">
                            "{currentTestimonial.testimonial}"
                        </p>

                        {/* Rating */}
                        <div className="flex justify-center gap-1 mb-8">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-6 h-6 ${i < currentTestimonial.rating
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-slate-700'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Client Info */}
                        <div className="flex items-center justify-center gap-4">
                            <img
                                src={currentTestimonial.image || `https://ui-avatars.com/api/?name=${currentTestimonial.name}&background=6366f1&color=fff`}
                                alt={currentTestimonial.name}
                                className="w-16 h-16 rounded-full border-2 border-indigo-500 shadow-lg"
                            />
                            <div className="text-left">
                                <h4 className="text-white font-serif font-bold text-lg">{currentTestimonial.name}</h4>
                                <p className="text-indigo-400 text-sm">{currentTestimonial.role}</p>
                                <p className="text-slate-500 text-xs">{currentTestimonial.company}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Controls */}
                {testimonials.length > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevTestimonial}
                            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-3 rounded-full transition-all duration-300 border border-slate-700/50"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-amber-500 w-8'
                                            : 'bg-slate-600 hover:bg-slate-500 w-2'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextTestimonial}
                            className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-3 rounded-full transition-all duration-300 border border-slate-700/50"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
