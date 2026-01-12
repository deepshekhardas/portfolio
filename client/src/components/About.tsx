
import React from 'react';
import { Server, Database, Code, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { ABOUT_TEXT } from '../data/config';

const About: React.FC = () => {
    const highlights = [
        {
            icon: <Server className="w-6 h-6 text-indigo-400" />,
            title: "Backend Development",
            description: "Building scalable APIs and microservices with Node.js and Express."
        },
        {
            icon: <Database className="w-6 h-6 text-indigo-400" />,
            title: "Database Design",
            description: "Designing efficient schemas for SQL and NoSQL databases like MongoDB & PostgreSQL."
        },
        {
            icon: <Globe className="w-6 h-6 text-indigo-400" />,
            title: "Full Stack Integration",
            description: "Seamlessly connecting frontends with robust backend logic using React and TypeScript."
        },
        {
            icon: <Code className="w-6 h-6 text-indigo-400" />,
            title: "Clean Code",
            description: "Writing maintainable, testable, and documented code following best practices."
        }
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background Decorative Elem */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">About Me</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5, borderColor: 'rgba(245, 158, 11, 0.3)' }}
                                    className="p-8 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-indigo-500/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group"
                                >
                                    <div className="w-14 h-14 bg-slate-950/80 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20 shadow-lg shadow-indigo-900/20 group-hover:border-amber-500/30 group-hover:shadow-amber-900/10 transition-all">
                                        {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7 text-indigo-400 group-hover:text-amber-400 transition-colors" })}
                                    </div>
                                    <h3 className="text-xl font-bold font-serif text-slate-100 mb-3 group-hover:text-amber-200 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed font-light">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2"
                    >
                        <h3 className="text-3xl lg:text-4xl font-bold font-serif text-white mb-8 leading-tight">
                            Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Innovation</span> & <br /> Technical Excellence
                        </h3>
                        <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light">
                            {ABOUT_TEXT.split('\n\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="mt-10 p-8 bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <div className="flex items-center justify-around gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-bold font-serif text-white mb-2">2<span className="text-amber-500">+</span></span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Years Exp.</span>
                                </div>
                                <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-bold font-serif text-white mb-2">10<span className="text-amber-500">+</span></span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Projects</span>
                                </div>
                                <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-700 to-transparent hidden sm:block"></div>
                                <div className="hidden sm:flex flex-col items-center">
                                    <span className="text-5xl font-bold font-serif text-white mb-2">100<span className="text-amber-500">%</span></span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Commitment</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
