
import React, { useState } from 'react';
import { Mail, Phone, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_DETAILS } from '../data/config';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Failed to send message');
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">Get In Touch</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <h3 className="text-3xl font-serif font-bold text-white mb-8">Let's talk about your project</h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-light">
                            I'm always interested in new opportunities, specifically in backend development and full-stack projects.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="space-y-6">
                            <motion.a
                                href={`mailto:${PERSONAL_DETAILS.email}`}
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 text-slate-300 group p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center text-indigo-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-xl">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Email Me</p>
                                    <p className="font-serif font-medium text-xl text-white">{PERSONAL_DETAILS.email}</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="#"
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 text-slate-300 group p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center text-indigo-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-xl">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Call Me</p>
                                    <p className="font-serif font-medium text-xl text-white">{PERSONAL_DETAILS.phone}</p>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] -z-10"></div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="relative">
                                <label
                                    htmlFor="name"
                                    className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors duration-200 ${focusedField === 'name' ? 'text-amber-500' : 'text-slate-500'}`}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500/50 focus:bg-slate-900/80 transition-all duration-300 placeholder-slate-700"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors duration-200 ${focusedField === 'email' ? 'text-amber-500' : 'text-slate-500'}`}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500/50 focus:bg-slate-900/80 transition-all duration-300 placeholder-slate-700"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors duration-200 ${focusedField === 'message' ? 'text-amber-500' : 'text-slate-500'}`}
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500/50 focus:bg-slate-900/80 transition-all duration-300 resize-none placeholder-slate-700"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status === 'submitting'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={24} />
                                    </>
                                )}
                            </motion.button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400"
                                >
                                    <CheckCircle size={20} />
                                    <p>Message sent successfully! I'll get back to you soon.</p>
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
                                >
                                    <AlertCircle size={20} />
                                    <p>{errorMessage || 'Something went wrong. Please try again.'}</p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
